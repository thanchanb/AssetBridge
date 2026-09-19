# AssetBridge 🌔

[![CI/CD Pipeline](https://github.com/thanchanb/AssetBridge/actions/workflows/ci.yml/badge.svg)](https://github.com/thanchanb/AssetBridge/actions/workflows/ci.yml)
[![Product X Profile](https://img.shields.io/badge/Product%20X%20Profile-@ThanchanB-1DA1F2.svg?logo=x)](https://x.com/ThanchanB)

AssetBridge is an open-source, privacy-preserving cross-chain asset shielding application built for the **Midnight Network** using its **Compact Zero-Knowledge (ZK)** smart contract framework.

---

## 1. What It Does

AssetBridge provides a 3D cyber/terminal interface for converting public Layer-1 assets into confidential, shielded equivalents (`ETH` ➔ `zETH`, `ADA` ➔ `sADA`) on Midnight:

- **Client-Side ZK Circuit Execution:** Encapsulates transaction quantities and user state within private witnesses compiled locally via `@midnight-ntwrk/compact-runtime`.
- **Selective Disclosure Model:** Smart contract logic explicitly discloses total value parameters (`tvl: Uint<32>`) to the public Compact ledger while obscuring sender identities and private witness payloads.
- **Lace Wallet Integration:** Integrates with Midnight Lace via `@midnight-ntwrk/dapp-connector-api` for account authorization and transaction signing.
- **Feedback Telemetry:** Collects user feedback directly within the dApp dashboard to inform iterative engineering improvements.

---

## 2. Why Midnight

Public blockchain ledgers expose transaction histories, wallet balances, and user interaction graphs. Midnight addresses this with a hybrid privacy architecture:

- **Compact DSL:** Midnight's domain-specific language (`Compact`) allows developers to separate public state from private witness data.
- **On-Client Proof Generation:** Zero-Knowledge proofs (zk-SNARKs) are compiled inside the user's local runtime before transaction broadcasting.
- **Selective Disclosure:** Smart contracts disclose only necessary ledger metadata (such as Total Value Locked) without revealing private user addresses or balance states.

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
- **Frontend Layer:** React 19, Vite 8, Three.js 3D background canvas, and Vanilla CSS glassmorphic design system.
- **Wallet Layer:** Standardized connector interfacing with Midnight Lace (`window.midnight`).

---

## 4. How to Run

### Prerequisites
- **Node.js:** v18 or higher
- **Compact Compiler:** `compact` CLI (v0.5.1 / 0.31.1+)
- **Docker Desktop:** Required for running the local Midnight Proof Server (`midnightntwrk/proof-server:8.1.0`)
- **Browser Extension:** Midnight Lace extension (configured to Preprod)

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

6. **Run Test Suite:**
   ```bash
   npm test
   ```

---

## 5. Live Demo & Project Links

- **Live Web Application:** [https://thanchanb.github.io/AssetBridge/](https://thanchanb.github.io/AssetBridge/)
- **GitHub Repository:** [https://github.com/thanchanb/AssetBridge](https://github.com/thanchanb/AssetBridge)
- **Compact Contract Spec:** [`contracts/AssetBridge.compact`](./contracts/AssetBridge.compact)
- **CI/CD Pipeline:** [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)
- **Creator X Profile:** [https://x.com/ThanchanB](https://x.com/ThanchanB)

---

## 6. Known Limitations & Technical Disclosures

1. **Proof Server Requirement:** Client-side ZK proof compilation for on-chain submission requires a running Midnight Proof Server container listening at `http://localhost:6300`. If the proof server is offline, the client application executes the circuit locally, computes gas metrics, and halts gracefully while reporting missing infrastructure.
2. **Network Alignment:** Midnight Lace must be set to the **Preprod** network in extension settings for wallet state authorization to succeed.
