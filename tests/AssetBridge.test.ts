import { describe, it, expect } from 'vitest';
import * as runtime from '@midnight-ntwrk/compact-runtime';
import { Contract, ledger } from '../managed/contract/index.js';

describe('AssetBridge Compact Contract Circuit Execution & Invariants', () => {
  const dummySecretKey = new Uint8Array(32).fill(7);

  const createTestContract = () => {
    return new Contract({
      userSecretKey: (context: any) => [context.privateState, dummySecretKey]
    });
  };

  const createFreshContext = (contract: Contract) => {
    const constructorContext = runtime.createConstructorContext(new Uint8Array(32), {});
    const init = contract.initialState(constructorContext);
    return runtime.createCircuitContext(
      runtime.dummyContractAddress(),
      new Uint8Array(32),
      init.currentContractState.data,
      {}
    );
  };

  it('1. Contract Initialization: should initialize with witness functions and all circuits defined', () => {
    const contract = createTestContract();
    expect(contract).toBeDefined();
    expect(contract.circuits.initializeBridge).toBeDefined();
    expect(contract.circuits.claimDeposit).toBeDefined();
    expect(contract.circuits.burnAndUnbridge).toBeDefined();
    expect(contract.circuits.bridge_asset).toBeDefined();
  });

  it('2. Bridge Custody Initialization: should initialize bridge custody authority and reset counters', () => {
    const contract = createTestContract();
    const context = createFreshContext(contract);

    const authority = new Uint8Array(32).fill(1);
    const result = contract.circuits.initializeBridge(context, authority);

    expect(result).toBeDefined();
    expect(result.gasCost.computeTime).toBeGreaterThan(0n);
    const state = ledger(result.context.currentQueryContext.state);
    expect(state.tvl).toBe(0n);
    expect(state.totalWithdrawn).toBe(0n);
    expect(state.totalDepositsCount).toBe(0n);
    expect(state.totalWithdrawalsCount).toBe(0n);
    expect(state.bridgeAuthority).toEqual(authority);
  });

  it('3. Deposit Claim & Asset Issuance: should claim deposit, update TVL, track asset supply, and credit user balance', () => {
    const contract = createTestContract();
    let context = createFreshContext(contract);

    const depositId = new Uint8Array(32);
    depositId[0] = 0xAA;
    depositId[1] = 0x01;

    const assetId = new Uint8Array(32);
    assetId[0] = 0x41; // 'A'
    assetId[1] = 0x44; // 'D'
    assetId[2] = 0x41; // 'A'

    const amount = 100_000_000n; // 100 ADA
    const recipientCommitment = new Uint8Array(32).fill(42);

    const result = contract.circuits.claimDeposit(context, depositId, assetId, amount, recipientCommitment);
    expect(result).toBeDefined();
    expect(result.gasCost.computeTime).toBeGreaterThan(0n);
    expect(result.gasCost.readTime).toBeGreaterThan(0n);

    const state = ledger(result.context.currentQueryContext.state);
    expect(state.tvl).toBe(amount);
    expect(state.totalDepositsCount).toBe(1n);
    expect(state.processedDeposits.member(depositId)).toBe(true);
    expect(state.assetIssuedSupply.member(assetId)).toBe(true);
    expect(state.assetIssuedSupply.lookup(assetId)).toBe(amount);
    expect(state.userShieldedBalances.member(recipientCommitment)).toBe(true);
    expect(state.userShieldedBalances.lookup(recipientCommitment)).toBe(amount);
  });

  it('4. Replay Protection: should strictly reject claiming the same deposit receipt twice', () => {
    const contract = createTestContract();
    let context = createFreshContext(contract);

    const depositId = new Uint8Array(32).fill(99);
    const assetId = new Uint8Array(32).fill(2);
    const amount = 50_000_000n;
    const recipient = new Uint8Array(32).fill(42);

    // First claim succeeds
    const firstResult = contract.circuits.claimDeposit(context, depositId, assetId, amount, recipient);
    context = firstResult.context;

    // Second claim with identical deposit ID MUST fail with replay assertion
    expect(() => {
      contract.circuits.claimDeposit(context, depositId, assetId, amount, recipient);
    }).toThrow(/Replay rejected/);
  });

  it('5. Arithmetic Safety: should reject zero, negative, or overflow amounts on claim', () => {
    const contract = createTestContract();
    const context = createFreshContext(contract);

    const depositId = new Uint8Array(32).fill(1);
    const assetId = new Uint8Array(32).fill(2);
    const recipient = new Uint8Array(32).fill(3);

    // Zero amount must fail
    expect(() => {
      contract.circuits.claimDeposit(context, depositId, assetId, 0n, recipient);
    }).toThrow(/positive/);

    // Overflow amount exceeding safety threshold must fail
    const overflowAmount = 1000000000000000001n;
    expect(() => {
      contract.circuits.claimDeposit(context, depositId, assetId, overflowAmount, recipient);
    }).toThrow(/safety cap/);
  });

  it('6. Burn & Unbridge Lifecycle: should verify authorization, burn assets, update totalWithdrawn, and preserve asset conservation', () => {
    const contract = createTestContract();
    let context = createFreshContext(contract);

    const saltBytes = new Uint8Array(32);
    const saltStr = new TextEncoder().encode('assetbridge_identity_salt');
    saltBytes.set(saltStr);
    const callerCommitment = runtime.persistentCommit(
      new runtime.CompactTypeBytes(32),
      dummySecretKey,
      saltBytes
    );

    const depositId = new Uint8Array(32).fill(11);
    const assetId = new Uint8Array(32).fill(22);
    const depositAmount = 200_000_000n;

    // Deposit to fund caller balance
    const depositResult = contract.circuits.claimDeposit(context, depositId, assetId, depositAmount, callerCommitment);
    context = depositResult.context;

    const stateBefore = ledger(context.currentQueryContext.state);
    expect(stateBefore.tvl).toBe(depositAmount);
    expect(stateBefore.userShieldedBalances.lookup(callerCommitment)).toBe(depositAmount);

    // Now burn and unbridge a portion
    const withdrawalNonce = new Uint8Array(32).fill(77);
    const burnAmount = 75_000_000n;
    const targetChainRecipient = new Uint8Array(32).fill(88); // e.g. Cardano address bytes

    const burnResult = contract.circuits.burnAndUnbridge(context, withdrawalNonce, assetId, burnAmount, targetChainRecipient);
    expect(burnResult).toBeDefined();

    const stateAfter = ledger(burnResult.context.currentQueryContext.state);
    expect(stateAfter.totalWithdrawn).toBe(burnAmount);
    expect(stateAfter.totalWithdrawalsCount).toBe(1n);
    expect(stateAfter.processedWithdrawals.member(withdrawalNonce)).toBe(true);
    expect(stateAfter.userShieldedBalances.lookup(callerCommitment)).toBe(depositAmount - burnAmount);
    expect(stateAfter.assetIssuedSupply.lookup(assetId)).toBe(depositAmount - burnAmount);

    // Invariant: totalWithdrawn <= tvl
    expect(stateAfter.totalWithdrawn <= stateAfter.tvl).toBe(true);
  });

  it('7. Withdrawal Replay Protection: should reject reusing the same withdrawal nonce', () => {
    const contract = createTestContract();
    let context = createFreshContext(contract);

    const saltBytes = new Uint8Array(32);
    saltBytes.set(new TextEncoder().encode('assetbridge_identity_salt'));
    const callerCommitment = runtime.persistentCommit(
      new runtime.CompactTypeBytes(32),
      dummySecretKey,
      saltBytes
    );

    const depositId = new Uint8Array(32).fill(33);
    const assetId = new Uint8Array(32).fill(44);
    const depositAmount = 500_000_000n;

    const depositResult = contract.circuits.claimDeposit(context, depositId, assetId, depositAmount, callerCommitment);
    context = depositResult.context;

    const withdrawalNonce = new Uint8Array(32).fill(99);
    const burnAmount = 10_000_000n;
    const targetChainRecipient = new Uint8Array(32).fill(1);

    const firstBurn = contract.circuits.burnAndUnbridge(context, withdrawalNonce, assetId, burnAmount, targetChainRecipient);
    context = firstBurn.context;

    // Second withdrawal with duplicate nonce MUST fail
    expect(() => {
      contract.circuits.burnAndUnbridge(context, withdrawalNonce, assetId, burnAmount, targetChainRecipient);
    }).toThrow(/Replay rejected: withdrawal nonce already used/);
  });

  it('8. Insufficient Balance Protection: cannot withdraw more than available user balance', () => {
    const contract = createTestContract();
    let context = createFreshContext(contract);

    const saltBytes = new Uint8Array(32);
    saltBytes.set(new TextEncoder().encode('assetbridge_identity_salt'));
    const callerCommitment = runtime.persistentCommit(
      new runtime.CompactTypeBytes(32),
      dummySecretKey,
      saltBytes
    );

    const depositId = new Uint8Array(32).fill(55);
    const assetId = new Uint8Array(32).fill(66);
    const depositAmount = 50_000_000n;

    const depositResult = contract.circuits.claimDeposit(context, depositId, assetId, depositAmount, callerCommitment);
    context = depositResult.context;

    const withdrawalNonce = new Uint8Array(32).fill(100);
    const excessiveBurnAmount = 100_000_000n; // more than deposited
    const targetRecipient = new Uint8Array(32).fill(2);

    expect(() => {
      contract.circuits.burnAndUnbridge(context, withdrawalNonce, assetId, excessiveBurnAmount, targetRecipient);
    }).toThrow(/Insufficient balance for withdrawal/);
  });

  it('9. Compatibility Circuit: bridge_asset should increment TVL safely', () => {
    const contract = createTestContract();
    const context = createFreshContext(contract);

    const testAmount = 5000000n;
    const circuitResult = contract.circuits.bridge_asset(context, testAmount);

    expect(circuitResult).toBeDefined();
    expect(circuitResult.gasCost).toBeDefined();
    expect(circuitResult.gasCost.computeTime).toBeGreaterThan(0n);
    expect(circuitResult.proofData).toBeDefined();

    const state = ledger(circuitResult.context.currentQueryContext.state);
    expect(state.tvl).toBe(testAmount);
    expect(state.totalDepositsCount).toBe(1n);
  });
});
