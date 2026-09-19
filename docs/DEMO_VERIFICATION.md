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
> 1. **CIRCUIT EXECUTION:** Client-side Compact circuit execution (`bridge_asset`) via `@midnight-ntwrk/compact-runtime`.
> 2. **ON-CHAIN BROADCAST PREREQUISITES:** On-chain broadcast requires a deployed contract address and an active Midnight Proof Server at `http://localhost:6300`. Without these, the dApp halts execution after proving and reports missing infrastructure honestly.

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
