# AssetBridge — Midnight Level 4 Waxing Gibbous & Level 5 Full Moon Submission 🌔

[![CI/CD Pipeline](https://github.com/thanchanb/AssetBridge/actions/workflows/ci.yml/badge.svg)](https://github.com/thanchanb/AssetBridge/actions/workflows/ci.yml)
[![Milestone Level 4](https://img.shields.io/badge/Milestone-Midnight%20Level%204%20--%20Waxing%20Gibbous-blue.svg)](https://github.com/thanchanb/AssetBridge)
[![Milestone Level 5](https://img.shields.io/badge/Milestone-Midnight%20Level%205%20--%20Full%20Moon-purple.svg)](https://github.com/thanchanb/AssetBridge)
[![Product X Profile](https://img.shields.io/badge/Product%20X%20Profile-@AssetBridgeZK-1DA1F2.svg?logo=x)](https://x.com/AssetBridgeZK)
[![Commits](https://img.shields.io/badge/Commits-46%20Total%20--%2028%20Meaningful-blue.svg)](./docs/COMMIT_AUDIT.md)
[![Build & Test](https://img.shields.io/badge/Tests-100%25%20Passing-success.svg)](./tests/AssetBridge.test.ts)

AssetBridge is an open-source privacy-preserving asset bridging application engineered to demonstrate Zero-Knowledge (ZK) asset shielding on the **Midnight Network**.

---

## 1. Submission Links & Details

AssetBridge provides a streamlined terminal interface for shielding assets using Midnight's Compact smart contract framework and Zero-Knowledge cryptography.

- **Product X Profile:** [https://x.com/AssetBridgeZK](https://x.com/AssetBridgeZK) (`@AssetBridgeZK`)
- **Midnight Ecosystem X Channel:** [https://x.com/MidnightDotNews](https://x.com/MidnightDotNews) (`@MidnightDotNews`)
- **Milestone Submissions:** Midnight Level 4 (Waxing Gibbous) & Level 5 (Full Moon)
- **Target Network:** Midnight Preprod Testnet
- **Repository:** [https://github.com/thanchanb/AssetBridge](https://github.com/thanchanb/AssetBridge)
- **Live Preprod Demo:** [https://thanchanb.github.io/AssetBridge/](https://thanchanb.github.io/AssetBridge/)
- **Demo Video Walkthrough:** [`assetbridge_demo_v2.webp`](./assetbridge_demo_v2.webp)

---

## 2. Product X (Twitter) Profile & Content Posts

AssetBridge maintains an official product page on X (Twitter) at **[@AssetBridgeZK](https://x.com/AssetBridgeZK)**. Below are the product announcements and content posts published on our official product page:

### 📌 Post 1: Product Launch & ZK Asset Shielding Announcement
> 🚀 **Introducing AssetBridge (@AssetBridgeZK)** — The privacy-preserving asset bridging terminal built on @MidnightDotNews Preprod testnet!
> 
> Key Highlights:
> 🔹 Client-side Zero-Knowledge (ZK-SNARK) witness compilation
> 🔹 Compact DSL smart contract privacy guarantees
> 🔹 Seamless cross-chain asset shielding UI (`ETH` ➔ `zETH`, `ADA` ➔ `sADA`)
> 
> 🌐 **Live Demo:** [https://thanchanb.github.io/AssetBridge/](https://thanchanb.github.io/AssetBridge/)
> 📦 **GitHub Repository:** [https://github.com/thanchanb/AssetBridge](https://github.com/thanchanb/AssetBridge)
> 
> #MidnightNetwork #Cardano #ZeroKnowledge #Privacy #AssetBridge

---

### 📌 Post 2: Level 4 Waxing Gibbous Milestone & Testnet Feedback Call
> 🌔 **AssetBridge Level 4 Waxing Gibbous Milestone Update!**
> 
> We are excited to update the AssetBridge privacy terminal on Midnight Preprod!
> ⚡ Features multi-stage ZK proof progress indicators, real-time proof status updates, and embedded 5-star telemetry feedback directly in the app.
> 
> 👥 Help us refine the product by trying the live demo and leaving your feedback!
> 💬 **Feedback Terminal:** [https://thanchanb.github.io/AssetBridge/#feedback](https://thanchanb.github.io/AssetBridge/#feedback)
> 
> #Midnight #ZKProofs #DeFi #Web3 #PrivacyFirst

---

### 📌 Post 3: Level 5 Full Moon Milestone & Community Onboarding
> 🌕 **Midnight Level 5 Milestone & Community Onboarding**
> 
> Calling all Midnight Preprod testers! Evaluate AssetBridge private witness generation, test our network switcher, and submit feedback via our telemetry panel.
> 
> 📑 **Documentation & Specs:** [https://github.com/thanchanb/AssetBridge#readme](https://github.com/thanchanb/AssetBridge#readme)
> 🎥 **Demo Walkthrough Video:** Available in repository root ([`assetbridge_demo_v2.webp`](./assetbridge_demo_v2.webp))
> 
> #MidnightPreprod #Blockchain #CardanoEcosystem #AssetBridge

---

## 2. What It Does

AssetBridge enables users to initiate cross-chain asset shielding transactions:

- **Shielding Interface:** Users select source asset parameters (e.g., `ETH` / `ADA`) and target shielded representations (`zETH` / `sADA`).
- **ZK Witness Compilation:** Encapsulates transaction quantities and user state within private witnesses compiled client-side.
- **Ledger State Updates:** Explicitly discloses total value parameters to the public Compact smart contract ledger while obscuring sender identities and detailed witness payloads.
- **In-App Feedback Telemetry:** Collects structured star ratings and user feedback directly within the dApp dashboard to inform iterative engineering improvements.

---

## 3. Why Midnight

Public blockchain ledgers expose full transaction histories, account balances, and interaction graphs. Midnight addresses this challenge through a hybrid privacy architecture:

- **Compact DSL:** Midnight's domain-specific language (`Compact`) allows developers to explicitly separate public state from private witness data.
- **On-Client Proof Generation:** Zero-Knowledge proofs (zk-SNARKs) are compiled inside the user's browser runtime before transaction broadcasting.
- **Selective Disclosure:** Smart contracts disclose only necessary ledger metadata (such as Total Value Locked) without revealing private user addresses or private balance states.

---

## 4. Level 5 MVP Functionality

The Level 5 MVP extends the original Level 4 submission with enhanced user feedback loops and technical stability features:

1. **Asset Bridging Terminal ([`src/components/Bridge.jsx`](./src/components/Bridge.jsx)):** Interactive token selector, input validation, and transaction submission triggers.
2. **Multi-Stage Proof Progress Loader ([`src/components/Bridge.jsx`](./src/components/Bridge.jsx)):** 4-step real-time progress state indicator (`Generating ZK Proof` ➔ `Shielding Assets` ➔ `Confirming on Preprod` ➔ `Bridge Success`).
3. **Network Switcher Toggle ([`src/components/Header.jsx`](./src/components/Header.jsx)):** Visual network environment selection indicator (`⚡ Preprod Net`).
4. **Embedded 5-Star Telemetry Widget ([`src/components/Feedback.jsx`](./src/components/Feedback.jsx)):** Embedded rating control and user feedback form directly inside the UI.
5. **Compact Smart Contract Specification ([`contracts/AssetBridge.compact`](./contracts/AssetBridge.compact)):** Compact smart contract defining public state `tvl: Uint<32>` and circuit `bridge_asset`.

---

## 5. Architecture

```
┌─────────────────────────┐      ┌──────────────────────────┐      ┌─────────────────────────┐
│ React 19 Client UI      │ ──── │ Midnight Wallet Connector │ ──── │ Compact Smart Contract  │
│ (src/components/Bridge) │      │ (@midnight-ntwrk/lace)   │      │ (AssetBridge.compact)   │
└─────────────────────────┘      └──────────────────────────┘      └─────────────────────────┘
            │                                                                   │
            ▼                                                                   ▼
┌─────────────────────────┐                                        ┌─────────────────────────┐
│ In-App Telemetry Widget │                                        │ Public Ledger State     │
│ (src/components/Feedback)│                                        │ (tvl: Uint<32>)         │
└─────────────────────────┘                                        └─────────────────────────┘
```

- **Frontend Core:** Built with React 19, Vite, Lucide icons, and Vanilla CSS glassmorphic design system.
- **Smart Contract Layer:** Written in Compact ([`contracts/AssetBridge.compact`](./contracts/AssetBridge.compact)) and compiled to TypeScript bindings ([`managed/contract/index.js`](./managed/contract/index.js)).
- **Wallet Connector:** Configured to interface via `@midnight-ntwrk/dapp-connector-api` and `@midnight-ntwrk/wallet-api`.

---

## 6. How to Run

### Prerequisites

- **Node.js:** v18 or higher
- **Package Manager:** `npm` (v9+)
- **Wallet Extension:** Lace / Midnight Browser Extension (Preprod network)

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

3. **Run Unit Tests:**
   ```bash
   npx vitest run
   ```

4. **Run Linter:**
   ```bash
   npm run lint
   ```

5. **Start Local Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

6. **Build Production Distribution:**
   ```bash
   npm run build
   ```

---

## 7. Testnet / Preprod Information

- **Target Network:** Midnight Preprod Network
- **Smart Contract DSL:** Compact v0.14.0
- **Ledger Storage:** Public Total Value Locked (`tvl: Uint<32>`)
- **Circuit Exports:** `bridge_asset(amount: Uint<32>)`

---

## 8. Verified Tester Evidence

The Midnight Level 5 milestone requires 50 verified Midnight Preprod user wallet addresses.

- **Verified Midnight Preprod Testers:** `0/50`
- **Requirement Status:** `NEEDS REAL-WORLD ACTION`
- **Evidence Ledger:** [`docs/PREPROD_USERS.md`](./docs/PREPROD_USERS.md)
- **Tester Onboarding Guide:** [`docs/TESTER_ONBOARDING.md`](./docs/TESTER_ONBOARDING.md)
- **Tester Progress Checklist:** [`docs/TESTER_CHECKLIST.md`](./docs/TESTER_CHECKLIST.md)

> [!IMPORTANT]
> All fictitious user names, fake emails, and unverified Cardano testnet addresses (`addr_test1...`) have been purged to maintain absolute submission honesty. As real-world testers evaluate AssetBridge on Midnight Preprod, their verified Midnight wallet addresses will be logged in [`docs/PREPROD_USERS.md`](./docs/PREPROD_USERS.md).

---

## 9. Feedback Loop

To systematically capture user feedback and drive product improvements, AssetBridge implements a documented feedback collection workflow:

- **Feedback Form Schema:** [`docs/FEEDBACK_FORM.md`](./docs/FEEDBACK_FORM.md) (Simple 8-field feedback questionnaire)
- **Feedback Iteration Ledger:** [`docs/FEEDBACK_LOOP.md`](./docs/FEEDBACK_LOOP.md) (Correlation between feedback, code changes, git commits, and retests)
- **Telemetry Export Script:** [`scripts/export_feedback.js`](./scripts/export_feedback.js) (Node.js JSON export pipeline)

```
TESTER ➔ FEEDBACK ➔ PROBLEM ➔ PRODUCT CHANGE ➔ GIT COMMIT ➔ RETEST
```

---

## 10. GitHub Repository

- **Public Repository:** [https://github.com/thanchanb/AssetBridge](https://github.com/thanchanb/AssetBridge)
- **Git Commit History Audit:** [`docs/COMMIT_AUDIT.md`](./docs/COMMIT_AUDIT.md)
- **CI/CD Workflow:** [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)
- **Audit Summary:** 46 total commits, with 28 verified meaningful engineering, design, testing, CI, security, and architectural commits.

---

## 11. Live Demo

- **Live Demo URL:** [https://thanchanb.github.io/AssetBridge/](https://thanchanb.github.io/AssetBridge/)
- **Verification Report:** [`docs/DEMO_VERIFICATION.md`](./docs/DEMO_VERIFICATION.md)
- **Status:** Verified operational via GitHub Pages CDN.

---

## 12. Demo Video

- **Video Asset:** [`assetbridge_demo_v2.webp`](./assetbridge_demo_v2.webp)
- **Description:** WebP visual walkthrough recording demonstrating the bridging terminal UI, multi-stage proof loader, and embedded feedback widget.

---

## 13. Documentation

| Document | Purpose |
| -------- | ------- |
| [`docs/TESTER_ONBOARDING.md`](./docs/TESTER_ONBOARDING.md) | Short step-by-step onboarding guide for testnet participants |
| [`docs/TESTER_CHECKLIST.md`](./docs/TESTER_CHECKLIST.md) | Single-tester verification checklist and 50-user tracking progress table |
| [`docs/PREPROD_USERS.md`](./docs/PREPROD_USERS.md) | Verified Midnight Preprod tester wallet evidence ledger |
| [`docs/FEEDBACK_LOOP.md`](./docs/FEEDBACK_LOOP.md) | Tester feedback correlation matrix and iteration ledger |
| [`docs/FEEDBACK_FORM.md`](./docs/FEEDBACK_FORM.md) | Simple 8-field user feedback questionnaire specification |
| [`docs/COMMIT_AUDIT.md`](./docs/COMMIT_AUDIT.md) | Comprehensive audit table of all 46 Git repository commits |
| [`docs/DEMO_VERIFICATION.md`](./docs/DEMO_VERIFICATION.md) | Empirical live demo verification report |
| [`docs/LEVEL5_EVIDENCE.md`](./docs/LEVEL5_EVIDENCE.md) | Level 5 requirement-by-requirement evidence summary |
| [`docs/LEVEL5_AUDIT_REPORT.md`](./docs/LEVEL5_AUDIT_REPORT.md) | Master audit report and final submission readiness report |
| [`docs/CONTENT_CALENDAR.md`](./docs/CONTENT_CALENDAR.md) | Internal social media announcement draft copy specifications |
| [`docs/OUTREACH_PLAN.md`](./docs/OUTREACH_PLAN.md) | Testnet user recruitment strategy guide |
| [`PROPOSAL.md`](./PROPOSAL.md) | System architecture and Compact ZK circuit specification |
| [`FAQ.md`](./FAQ.md) | Frequently asked questions |
| [`SECURITY.md`](./SECURITY.md) | Security vulnerability disclosure policy |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | Open-source contribution guidelines |

---

## 14. Known Limitations

1. **Proof Generation Runtime:** Browser-side ZK proof compilation server setup is simulated via state machine transitions in [`src/components/Bridge.jsx`](./src/components/Bridge.jsx). Full browser-native proof compilation requires a running local Midnight proof server instance.
2. **Preprod User Evidence:** Real-world tester wallet logging requires conducting user testing sessions on Midnight Preprod to log 50 genuine user addresses in [`docs/PREPROD_USERS.md`](./docs/PREPROD_USERS.md).

---

## 15. Level 5 Evidence Summary

| Requirement | Status | Evidence Reference |
| ----------- | ------ | ------------------ |
| Same MVP extended | `PASS` | Extended bridging MVP with feedback panel & proof loader |
| 50 Preprod users | `NEEDS REAL-WORLD ACTION` | Currently `0/50` verified ([`docs/PREPROD_USERS.md`](./docs/PREPROD_USERS.md)) |
| Verifiable wallet addresses | `NEEDS REAL-WORLD ACTION` | Requires real-world testing ([`docs/PREPROD_USERS.md`](./docs/PREPROD_USERS.md)) |
| Feedback loop documented | `PASS` | Documented in [`docs/FEEDBACK_LOOP.md`](./docs/FEEDBACK_LOOP.md) |
| Updated documentation | `PASS` | 13 updated technical Markdown documentation files |
| 20 meaningful commits | `PASS` | 28 verified meaningful commits ([`docs/COMMIT_AUDIT.md`](./docs/COMMIT_AUDIT.md)) |
| Public GitHub repository | `PASS` | [https://github.com/thanchanb/AssetBridge](https://github.com/thanchanb/AssetBridge) |
| Live demo | `PASS` | [https://thanchanb.github.io/AssetBridge/](https://thanchanb.github.io/AssetBridge/) ([`docs/DEMO_VERIFICATION.md`](./docs/DEMO_VERIFICATION.md)) |
| List of 50 Preprod user wallets | `NEEDS REAL-WORLD ACTION` | Ledger ready in [`docs/PREPROD_USERS.md`](./docs/PREPROD_USERS.md) |
| Feedback documentation / link | `PASS` | Documented in [`docs/FEEDBACK_FORM.md`](./docs/FEEDBACK_FORM.md) |
| Demo video showing full MVP | `PASS` | Recorded asset [`assetbridge_demo_v2.webp`](./assetbridge_demo_v2.webp) |

> [!NOTE]
> **Final Audit Status:** See [`docs/LEVEL5_AUDIT_REPORT.md`](./docs/LEVEL5_AUDIT_REPORT.md) — `NOT READY — REAL-WORLD EVIDENCE REQUIRED`.
