import { describe, it, expect } from 'vitest';
import * as runtime from '@midnight-ntwrk/compact-runtime';
import { Contract } from '../managed/contract/index.js';

describe('AssetBridge Compact Contract Circuit Execution', () => {
  it('should initialize the contract instance with witnesses', () => {
    const witnesses = {};
    const contract = new Contract(witnesses);
    expect(contract).toBeDefined();
    expect(contract.circuits.bridge_asset).toBeDefined();
  });

  it('should execute bridge_asset circuit and calculate real gas costs and transcripts', () => {
    const contract = new Contract({});
    const constructorContext = runtime.createConstructorContext(new Uint8Array(32), {});
    const init = contract.initialState(constructorContext);
    
    const context = runtime.createCircuitContext(
      runtime.dummyContractAddress(),
      new Uint8Array(32),
      init.currentContractState.data,
      {}
    );

    const testAmount = 5000000n; // 5.0 scaled by 1e6
    const circuitResult = contract.circuits.bridge_asset(context, testAmount);

    expect(circuitResult).toBeDefined();
    expect(circuitResult.gasCost).toBeDefined();
    expect(circuitResult.gasCost.computeTime).toBeGreaterThan(0n);
    expect(circuitResult.gasCost.readTime).toBeGreaterThan(0n);
    expect(circuitResult.gasCost.bytesWritten).toBeGreaterThan(0n);
    expect(circuitResult.proofData).toBeDefined();
    expect(circuitResult.proofData.publicTranscript.length).toBeGreaterThan(0);
  });

  it('should enforce Uint32 boundary on bridge_asset', () => {
    const contract = new Contract({});
    const constructorContext = runtime.createConstructorContext(new Uint8Array(32), {});
    const init = contract.initialState(constructorContext);
    
    const context = runtime.createCircuitContext(
      runtime.dummyContractAddress(),
      new Uint8Array(32),
      init.currentContractState.data,
      {}
    );

    // Overflowing Uint32 (max 4294967295)
    const overflowAmount = 4294967296n;
    expect(() => {
      contract.circuits.bridge_asset(context, overflowAmount);
    }).toThrow();
  });
});
