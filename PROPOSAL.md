# AssetBridge — Project Architecture & Compact Circuit Specification (Level 5)

AssetBridge is a privacy-preserving cross-chain asset bridging application built to demonstrate asset shielding using **Midnight's Zero-Knowledge (ZK) technology stack**.

## Architecture Breakdown

1. **Compact Smart Contract (`contracts/AssetBridge.compact`)**: Written in Compact (Midnight's ZK domain-specific language), defining public ledger state (`tvl: Uint<32>`) and private witness circuit logic (`bridge_asset`).
2. **TypeScript Contract Bindings (`managed/contract/index.js`)**: Compiled TypeScript bindings generated via the Compact compiler interface.
3. **Vite + React Client Application (`src/`)**: A responsive UI interacting with the Midnight DApp connector API (`@midnight-ntwrk/dapp-connector-api`) and connected Lace wallet extensions.

## Data Flow Diagram

```
[ User Input ] ➔ [ Local State / Witness ] ➔ [ Midnight Wallet Connector ] ➔ [ Midnight Preprod Network ]
```

## Level 5 MVP Features Deployed

- **Bridging Terminal UI:** Asset selection, quantity inputs, and ZK proof progress loader (`Bridge.jsx`).
- **Network Switcher Badge:** Network environment indicator (`Header.jsx`).
- **In-App Feedback Widget:** Embedded 5-star rating and user telemetry form (`Feedback.jsx`).
- **Compact Contract Spec:** Declarative privacy model specifying public disclosures and witness encapsulation (`contracts/AssetBridge.compact`).
