import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  userSecretKey(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  initializeBridge(context: __compactRuntime.CircuitContext<PS>,
                   authority_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  claimDeposit(context: __compactRuntime.CircuitContext<PS>,
               depositId_0: Uint8Array,
               assetId_0: Uint8Array,
               amount_0: bigint,
               recipientCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  burnAndUnbridge(context: __compactRuntime.CircuitContext<PS>,
                  withdrawalNonce_0: Uint8Array,
                  assetId_0: Uint8Array,
                  amount_0: bigint,
                  targetChainRecipient_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  bridge_asset(context: __compactRuntime.CircuitContext<PS>, amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  initializeBridge(context: __compactRuntime.CircuitContext<PS>,
                   authority_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  claimDeposit(context: __compactRuntime.CircuitContext<PS>,
               depositId_0: Uint8Array,
               assetId_0: Uint8Array,
               amount_0: bigint,
               recipientCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  burnAndUnbridge(context: __compactRuntime.CircuitContext<PS>,
                  withdrawalNonce_0: Uint8Array,
                  assetId_0: Uint8Array,
                  amount_0: bigint,
                  targetChainRecipient_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  bridge_asset(context: __compactRuntime.CircuitContext<PS>, amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  initializeBridge(context: __compactRuntime.CircuitContext<PS>,
                   authority_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  claimDeposit(context: __compactRuntime.CircuitContext<PS>,
               depositId_0: Uint8Array,
               assetId_0: Uint8Array,
               amount_0: bigint,
               recipientCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  burnAndUnbridge(context: __compactRuntime.CircuitContext<PS>,
                  withdrawalNonce_0: Uint8Array,
                  assetId_0: Uint8Array,
                  amount_0: bigint,
                  targetChainRecipient_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  bridge_asset(context: __compactRuntime.CircuitContext<PS>, amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly bridgeAuthority: Uint8Array;
  readonly tvl: bigint;
  readonly totalWithdrawn: bigint;
  readonly totalDepositsCount: bigint;
  readonly totalWithdrawalsCount: bigint;
  processedDeposits: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  processedWithdrawals: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  assetIssuedSupply: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
  userShieldedBalances: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
