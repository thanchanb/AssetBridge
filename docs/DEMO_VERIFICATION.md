# AssetBridge — Live Demo & Deployment Verification Report

This document records the empirical verification testing performed on the live AssetBridge dApp deployment.

## Live Deployment Details

- **Live Demo URL:** [https://thanchanb.github.io/AssetBridge/](https://thanchanb.github.io/AssetBridge/)
- **Repository URL:** [https://github.com/thanchanb/AssetBridge](https://github.com/thanchanb/AssetBridge)
- **Verification Date:** 2026-09-13
- **Environment Tested:** macOS / Chrome Browser / Midnight Preprod Target Environment

---

## Technical Scope Disclosures

> [!IMPORTANT]
> **Implementation Scope & On-Chain Status:**
> 1. **REAL MIDNIGHT PREPROD CONTRACT ACTIVITY:** `NOT IMPLEMENTED`  
>    While the Compact smart contract [`contracts/AssetBridge.compact`](../contracts/AssetBridge.compact) is written and compiled to TypeScript bindings ([`managed/contract/index.js`](../managed/contract/index.js)), the frontend application does NOT deploy or broadcast live transactions to an on-chain Midnight indexer or RPC node.
> 2. **PROOF GENERATION:** `CLIENT SIMULATION MODE`  
>    ZK proof compilation and network confirmation are simulated in browser runtime state machines within [`src/components/Bridge.jsx`](../src/components/Bridge.jsx).
> 3. **ACTIVITY IDENTIFIERS:** `DEMO ACTIVITY ID`  
>    The returned identifier `mn_tx_...` is a client session Activity ID, NOT a verified on-chain Midnight transaction hash.

---

## Verification Matrix & Workflow Results

| # | Verification Test Step | Operational Result | Status |
| - | ---------------------- | ------------------ | ------ |
| 1 | **URL Accessibility** | Application loads cleanly over HTTPS via GitHub Pages CDN without 404 or host resolution errors. | `PASS` |
| 2 | **UI Layout & Design** | Glassmorphic interface, dark theme glowing accents, and responsive containers render without visual distortion. | `PASS` |
| 3 | **Wallet Connection Trigger** | Clicking **Connect Wallet** triggers Lace / Midnight wallet extension API detection (`window.midnight.mnLace`). | `PASS` |
| 4 | **Bridge Terminal Inputs** | Token pair selector and asset quantity numeric inputs update state interactively. | `PASS` |
| 5 | **Proof Loader State Machine** | Clicking **Generate ZK Proof & Bridge** executes progress state machine (`Generating ZK Proof (Compact DSL)` ➔ `Confirming on Midnight Preprod`). | `PASS` |
| 6 | **In-App Feedback Widget** | Embedded `#feedback` panel accepts star ratings and text feedback with confirmation state. | `PASS` |
| 7 | **Console Error Audit** | Clean execution with zero uncaught JavaScript runtime exceptions or console crash warnings. | `PASS` |
