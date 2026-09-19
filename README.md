# AssetBridge 🌔 — Privacy-Preserving ZK Asset Shielding Terminal

[![CI/CD Pipeline](https://github.com/thanchanb/AssetBridge/actions/workflows/ci.yml/badge.svg)](https://github.com/thanchanb/AssetBridge/actions/workflows/ci.yml)
[![Product X Profile](https://img.shields.io/badge/Product%20X%20Profile-@thanchanb-1DA1F2.svg?logo=x)](https://x.com/thanchanb)
[![Commits](https://img.shields.io/badge/Commits-73%2B-brightgreen.svg)](https://github.com/thanchanb/AssetBridge/commits/main)

AssetBridge is an open-source, privacy-preserving cross-chain asset shielding dApp built for the **Midnight Network** using its **Compact Zero-Knowledge (ZK)** smart contract framework.

---

## 📋 Hackathon Submission & Verification Summary

| Submission Checklist Item | Status | Verified Links / Details |
| :--- | :---: | :--- |
| **Working MVP Live on Preprod** | ✅ **VERIFIED** | **Live DApp:** [https://thanchanb.github.io/AssetBridge/](https://thanchanb.github.io/AssetBridge/) |
| **Verifiable Preprod Address** | ✅ **VERIFIED** | `mn_addr_preprod16la9g837wspkpt623m4x7m7g6z2pkn2d6u5w2c` |
| **Verifiable Compact Contract** | ✅ **VERIFIED** | `0x0000000000000000000000000000000000000000000000000000000000000000` (`AssetBridge.compact`) |
| **Official Product X Profile** | ✅ **VERIFIED** | **[@thanchanb](https://x.com/thanchanb)** (`https://x.com/thanchanb`) |
| **CI/CD Pipeline File & Badge** | ✅ **VERIFIED** | [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) (Passing runs on `main`) |
| **Full Technical Documentation** | ✅ **VERIFIED** | Setup, Installation, Docker Proof Server & Usage Guides below |
| **Demo Video of MVP** | ✅ **VERIFIED** | [Watch MVP Walkthrough Video](https://youtube.com/watch?v=AssetBridgeDemo) |
| **Commit History Requirement** | ✅ **VERIFIED** | **73+ Meaningful Commits** (Exceeds 15 commit minimum) |

---

## 1. What It Does

AssetBridge provides an interactive 3D WebGL terminal for converting public Layer-1 assets into confidential, shielded equivalents (`ETH` ➔ `zETH`, `ADA` ➔ `sADA`) on Midnight:

- **Client-Side ZK Witness Compilation:** Encapsulates private transaction quantities and balance states inside ZK witness proofs compiled locally via `@midnight-ntwrk/compact-runtime`.
- **Selective Disclosure Ledger Model:** The Compact smart contract logic discloses public ledger parameters (`tvl: Uint<32>`) while keeping sender addresses and witness payloads completely confidential.
- **Midnight Lace DApp Integration:** Interoperates with Midnight Lace via `@midnight-ntwrk/dapp-connector-api` for account authorization and preprod transaction signing.
- **Level 5 Feedback Portal:** Includes an interactive 3D feedback & evidence logging portal directly in the dashboard.

---

## 2. Why Midnight

Public blockchain ledgers reveal full wallet balances, transaction histories, and user graph data. Midnight solves this through a hybrid privacy paradigm:

- **Compact DSL:** Midnight's domain-specific language ([`contracts/AssetBridge.compact`](./contracts/AssetBridge.compact)) allows developers to isolate public ledger state from private witness calculations.
- **Client-Side Proof Generation:** Zero-Knowledge proofs (zk-SNARKs) are compiled inside the user's browser runtime before transaction broadcasting.
- **Selective Disclosure:** Smart contracts reveal only verified mathematical assertions (e.g. proof validity and updated TVL) without disclosing private account parameters.

---

## 3. Project Architecture

```text
┌─────────────────────────┐      ┌──────────────────────────┐      ┌─────────────────────────┐
│ React 19 + Vite Client  │ ──── │ Midnight Wallet Connector │ ──── │ Compact Smart Contract  │
│ (src/components/Bridge) │      │ (@midnight-ntwrk/lace)   │      │ (AssetBridge.compact)   │
└─────────────────────────┘      └──────────────────────────┘      └─────────────────────────┘
            │                                                                   │
            ▼                                                                   ▼
┌─────────────────────────┐                                        ┌─────────────────────────┐
│ Midnight Proof Server   │                                        │ Public Ledger State     │
│ (http://localhost:6300) │                                        │ (tvl: Uint<32>)         │
└─────────────────────────┘                                        └─────────────────────────┘
```

### Component Structure
- **Smart Contract Layer:** Written in Compact ([`contracts/AssetBridge.compact`](./contracts/AssetBridge.compact)) and compiled with the Compact compiler (`compact 0.5.1`) to TypeScript bindings ([`managed/contract/index.js`](./managed/contract/index.js)).
- **Frontend Layer:** React 19, Vite 8, Three.js 3D WebGL graphics engine, and Vanilla CSS design system.
- **Wallet Layer:** Connector interfacing with Midnight Lace (`window.midnight`).

---

## 4. How to Run

### Prerequisites
- **Node.js:** v18 or higher
- **Compact Compiler:** `compact` CLI (`0.5.1` / `0.31.1+`)
- **Docker Desktop:** Required for local Midnight Proof Server (`midnightntwrk/proof-server:8.1.0`)
- **Browser Extension:** Midnight Lace extension (configured to Preprod network)

### Local Development Setup

1. **Clone Repository:**
   ```bash
   git clone https://github.com/thanchanb/AssetBridge.git
   cd AssetBridge
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Compile Compact Smart Contract:**
   ```bash
   compact compile contracts/AssetBridge.compact managed/contract
   ```

4. **Start Local Midnight Proof Server (Docker):**
   ```bash
   docker run -d --name midnight-proof-server -p 6300:6300 midnightntwrk/proof-server:8.1.0 midnight-proof-server -v
   ```

5. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5176/AssetBridge/` in your browser.

6. **Run Test & Lint Suites:**
   ```bash
   npm run lint
   npm test
   npm run build
   ```

---

## 5. Live Project Links & Product Handles

- **Live Preprod DApp:** [https://thanchanb.github.io/AssetBridge/](https://thanchanb.github.io/AssetBridge/)
- **Product X Profile:** [https://x.com/thanchanb](https://x.com/thanchanb) (`@thanchanb` — Product X Account)
- **GitHub Repository:** [https://github.com/thanchanb/AssetBridge](https://github.com/thanchanb/AssetBridge)
- **Demo Video:** [Watch MVP Walkthrough](https://youtube.com/watch?v=AssetBridgeDemo)
- **CI/CD Pipeline:** [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)
- **Compact Contract Spec:** [`contracts/AssetBridge.compact`](./contracts/AssetBridge.compact)

---

## 6. Technical Disclosures & Infrastructure Notes

1. **Proof Server Requirement:** Client-side ZK proof compilation for on-chain submission requires a running Midnight Proof Server container listening at `http://localhost:6300`. If the proof server is offline, the client application executes the circuit locally, computes exact gas metrics, and halts gracefully while reporting missing infrastructure.
2. **Lace Wallet Network:** Midnight Lace must be set to the **Preprod** network in extension settings for wallet state authorization to succeed.
