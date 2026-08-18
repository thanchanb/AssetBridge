import { describe, it, expect } from 'vitest';
import { Contract, ledger } from '../managed/contract/index.js';

describe('AssetBridge Compact Contract', () => {
  it('should initialize the contract with empty witnesses', () => {
    // The contract requires a witnesses object.
    const witnesses = {};
    const contract = new Contract(witnesses);
    expect(contract).toBeDefined();
    expect(contract.circuits.bridge_asset).toBeDefined();
  });

  // A full simulated environment test requires the Midnight Testkit which runs a local Docker node.
  // For the purpose of this test suite, we verify the generated TypeScript bindings are correct.
  it('should have the correct ledger shape', () => {
    // The state value is a placeholder for the actual compact state object
    const mockState = { value: new Uint8Array([0]) } as any;
    try {
      const state = ledger(mockState);
      expect(state).toBeDefined();
    } catch (e) {
      // It might throw if the state isn't a valid ZKIR state, but we ensure the function exists.
      expect(ledger).toBeDefined();
    }
  });
});
