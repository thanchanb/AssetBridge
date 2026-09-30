import { describe, it, expect } from 'vitest';
import {
  createDepositReceipt,
  deriveRecipientCommitment,
  createBridgeContract,
  createFreshCircuitContext,
  executeClaimDeposit,
  executeBurnAndUnbridge,
  runBridgeTransaction,
  padBytes32,
  generateRandomBytes
} from '../src/services/midnightBridge.js';

describe('Complete Preprod Deposit-to-Claim & Withdrawal Lifecycle', () => {
  const testSecretKey = new Uint8Array(32).fill(13);
  const testRecipientCommitment = deriveRecipientCommitment(testSecretKey);

  it('1. Deposit Receipt Generation: creates authentic cryptographic receipt with origin chain metadata', () => {
    const receipt = createDepositReceipt({
      sourceChain: 'Cardano Preprod',
      sourceTxHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      assetSymbol: 'ADA',
      amount: 250.5,
      depositorAddress: 'addr_test1qrz...',
      recipientCommitment: testRecipientCommitment
    });

    expect(receipt).toBeDefined();
    expect(receipt.sourceChain).toBe('Cardano Preprod');
    expect(receipt.assetSymbol).toBe('ADA');
    expect(receipt.amount).toBe(250500000n);
    expect(receipt.depositId.length).toBe(32);
    expect(receipt.depositIdHex.length).toBe(64);
    expect(receipt.recipientCommitment).toEqual(testRecipientCommitment);
  });

  it('2. Complete Deposit-to-Claim Execution: verifies deposit, updates TVL, and issues shielded assets', () => {
    const contract = createBridgeContract(testSecretKey);
    const context = createFreshCircuitContext(contract);

    const receipt = createDepositReceipt({
      sourceChain: 'Cardano Preprod',
      assetSymbol: 'ADA',
      amount: 100,
      recipientCommitment: testRecipientCommitment
    });

    const execution = executeClaimDeposit({
      contract,
      context,
      depositId: receipt.depositId,
      assetId: receipt.assetId,
      amount: receipt.amount,
      recipientCommitment: testRecipientCommitment
    });

    expect(execution).toBeDefined();
    expect(execution.state.tvl).toBe(receipt.amount);
    expect(execution.state.totalDepositsCount).toBe(1n);
    expect(execution.gasCost.computeTime).toBeDefined();
    expect(execution.gasCost.readTime).toBeDefined();
  });

  it('3. Replay Protection Enforcement: blocks reusing the same deposit receipt', () => {
    const contract = createBridgeContract(testSecretKey);
    let context = createFreshCircuitContext(contract);

    const receipt = createDepositReceipt({
      sourceChain: 'Cardano Preprod',
      assetSymbol: 'ADA',
      amount: 50,
      recipientCommitment: testRecipientCommitment
    });

    // First claim succeeds
    const firstExec = executeClaimDeposit({
      contract,
      context,
      depositId: receipt.depositId,
      assetId: receipt.assetId,
      amount: receipt.amount,
      recipientCommitment: testRecipientCommitment
    });
    context = firstExec.context;

    // Second claim with duplicate depositId MUST be rejected
    expect(() => {
      executeClaimDeposit({
        contract,
        context,
        depositId: receipt.depositId,
        assetId: receipt.assetId,
        amount: receipt.amount,
        recipientCommitment: testRecipientCommitment
      });
    }).toThrow(/Replay rejected/);
  });

  it('4. Complete Withdrawal & Burn Lifecycle: verifies authorization, burns wrapped asset, and protects conservation', () => {
    const contract = createBridgeContract(testSecretKey);
    let context = createFreshCircuitContext(contract);

    const assetId = padBytes32('ADA');
    const depositAmount = 300_000_000n; // 300 ADA
    const burnAmount = 120_000_000n;    // 120 ADA

    // Deposit to establish balance
    const depositExec = executeClaimDeposit({
      contract,
      context,
      depositId: generateRandomBytes(32),
      assetId,
      amount: depositAmount,
      recipientCommitment: testRecipientCommitment
    });
    context = depositExec.context;

    // Burn wrapped asset to withdraw back to Cardano Preprod
    const withdrawalNonce = generateRandomBytes(32);
    const cardanoRecipient = padBytes32('addr_test1qzcardanopayoutaddress');

    const burnExec = executeBurnAndUnbridge({
      contract,
      context,
      withdrawalNonce,
      assetId,
      amount: burnAmount,
      targetChainRecipient: cardanoRecipient
    });

    expect(burnExec).toBeDefined();
    expect(burnExec.state.totalWithdrawn).toBe(burnAmount);
    expect(burnExec.state.totalWithdrawalsCount).toBe(1n);
    expect(burnExec.state.totalWithdrawn <= burnExec.state.tvl).toBe(true);
  });

  it('5. Withdrawal Replay Protection: blocks reusing the same withdrawal nonce', () => {
    const contract = createBridgeContract(testSecretKey);
    let context = createFreshCircuitContext(contract);

    const assetId = padBytes32('ADA');
    const depositExec = executeClaimDeposit({
      contract,
      context,
      depositId: generateRandomBytes(32),
      assetId,
      amount: 200_000_000n,
      recipientCommitment: testRecipientCommitment
    });
    context = depositExec.context;

    const duplicateNonce = generateRandomBytes(32);
    const recipient = padBytes32('addr_test1...');

    const firstBurn = executeBurnAndUnbridge({
      contract,
      context,
      withdrawalNonce: duplicateNonce,
      assetId,
      amount: 50_000_000n,
      targetChainRecipient: recipient
    });
    context = firstBurn.context;

    // Reusing the same nonce must fail
    expect(() => {
      executeBurnAndUnbridge({
        contract,
        context,
        withdrawalNonce: duplicateNonce,
        assetId,
        amount: 50_000_000n,
        targetChainRecipient: recipient
      });
    }).toThrow(/Replay rejected/);
  });

  it('6. Orchestrated Lifecycle Runner: executes deposit workflow and accurately reports diagnostic state without fake claims', async () => {
    const stagesRecorded: Array<{ stage: number; state: string; message: string }> = [];

    const result = await runBridgeTransaction({
      action: 'deposit',
      amount: '15.5',
      tokenPair: {
        source: 'ADA',
        sourceName: 'Cardano Preprod',
        target: 'sADA',
        targetName: 'Midnight'
      },
      walletAddress: 'addr_preprod_test123',
      userSecretKey: testSecretKey,
      onStageChange: (stage, status) => {
        stagesRecorded.push({ stage, state: status.state, message: status.message });
      }
    });

    expect(result).toBeDefined();
    expect(result.status).toBe('verified_simulation');
    expect(stagesRecorded.length).toBeGreaterThanOrEqual(3);
    
    // Crucial check: verify that when proof server is offline, it NEVER claims fake confirmed success
    const finalStage = stagesRecorded[stagesRecorded.length - 1];
    expect(finalStage.state).not.toBe('success');
    expect(finalStage.state).toBe('verified_simulation');
    expect(finalStage.message).toMatch(/verified/i);
  });
});
