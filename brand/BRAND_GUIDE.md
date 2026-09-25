# AssetBridge 🌔 — Official Brand Assets & Product X Setup Guide

> **Status:** Created to resolve the hackathon revision feedback:  
> *"The twitter page link should be of your product and not your personal. Make sure to create your brand assets and post some content related to your product on your product page."*

---

## 🎨 1. Pre-Generated Official Brand Assets

All brand assets have been generated, optimized, and saved directly inside the [`brand/`](./) and [`public/brand/`](../public/brand/) directories:

| Asset | File Path | Resolution / Format | Usage |
| :--- | :--- | :--- | :--- |
| **Profile Avatar (PFP)** | [`brand/profile_avatar.jpg`](./profile_avatar.jpg) | 1024×1024 JPG (Square / Circular safe) | Twitter / X Profile Picture, Discord, GitHub Org |
| **Header Banner** | [`brand/twitter_banner.jpg`](./twitter_banner.jpg) | 1792×1024 (16:9 / 3:1 safe) | Twitter / X Account Header Banner |
| **Product Launch Card** | [`brand/launch_card.jpg`](./launch_card.jpg) | 1792×1024 HD Landscape | Attached to Pinned Launch Tweet & Announcements |
| **Vector Logo Mark** | [`brand/logo.svg`](./logo.svg) | Scalable Vector SVG | DApp UI, Favicon, Documentation |
| **Vector Wide Banner** | [`brand/banner.svg`](./banner.svg) | Scalable Vector SVG (1200×400) | GitHub Readme, Documentation headers |

---

## 🛠️ 2. Quick Product Profile Setup (2 Minutes)

You have two simple options to satisfy the reviewer requirements:

### Option A: Create a Dedicated Product Account (Recommended)
1. Go to [x.com](https://x.com) and register a new free handle: e.g. **`@AssetBridgeZK`** (or `@AssetBridgeApp`).
2. **Display Name:** `AssetBridge 🌔`
3. **Bio:**  
   ```text
   Official privacy-preserving ZK asset shielding terminal on @MidnightDotNews Preprod. Bridge public L1s into confidential shielded assets.
   ```
4. **Website Link:** `https://thanchanb.github.io/AssetBridge/`
5. **Profile Picture:** Upload [`brand/profile_avatar.jpg`](./profile_avatar.jpg)
6. **Header Banner:** Upload [`brand/twitter_banner.jpg`](./twitter_banner.jpg)

### Option B: Rebrand Existing Account (`@thanchanb`)
If you prefer not to manage two accounts:
1. Open your profile settings on [x.com/thanchanb](https://x.com/thanchanb).
2. Change **Display Name** to: `AssetBridge 🌔 (@thanchanb)`
3. Update **Bio** to include:  
   ```text
   Official Product Account for AssetBridge — Privacy-preserving ZK asset shielding on @MidnightDotNews Preprod | Built by @ThanchanB
   ```
4. Upload [`brand/profile_avatar.jpg`](./profile_avatar.jpg) as Avatar and [`brand/twitter_banner.jpg`](./twitter_banner.jpg) as Header.

---

## 📢 3. Ready-to-Publish Product Content (Copy-Paste)

Publish these 3 posts on your product X page. The reviewers specifically requested *"post some content related to your product on your product page"*.

### Post 1: Official Product Launch (Pin This Post 📌)
- **Attach Image:** [`brand/launch_card.jpg`](./launch_card.jpg)
- **Copy Text:**
```text
🚀 Introducing AssetBridge — The privacy-preserving asset shielding terminal built on @MidnightDotNews Preprod testnet!

✨ Transform public Layer-1 assets into confidential, shielded equivalents (ETH ➔ zETH, ADA ➔ sADA).

🔹 Client-side Zero-Knowledge (ZK-SNARK) witness compilation
🔹 Compact DSL smart contract privacy guarantees
🔹 Midnight Lace wallet integration & selective disclosure

🌐 Live DApp: https://thanchanb.github.io/AssetBridge/
📦 GitHub: https://github.com/thanchanb/AssetBridge

#MidnightNetwork #Cardano #ZeroKnowledge #Privacy #AssetBridge #Web3
```

---

### Post 2: Compact Smart Contract & ZK Architecture Deep Dive
- **Attach Image:** [`brand/twitter_banner.jpg`](./twitter_banner.jpg)
- **Copy Text:**
```text
🌔 How AssetBridge Protects Your On-Chain Identity:

Public ledgers expose complete transaction amounts and sender graphs. AssetBridge leverages Midnight's Compact smart contract framework:

🔒 Private Witness: Amount & account balance computed locally via client runtime
🛡️ Public Disclosure: Discloses only verified circuit state & TVL increments
⚡ Proof Server: Zero data leakage to public nodes

📑 Read the Compact contract spec: https://github.com/thanchanb/AssetBridge#readme

#Midnight #ZKProofs #DeFi #Web3 #PrivacyFirst
```

---

### Post 3: Preprod Tester Call & Embedded Telemetry
- **Attach Video / GIF:** [`assetbridge_demo_v2.webp`](../assetbridge_demo_v2.webp)
- **Copy Text:**
```text
🌕 AssetBridge Level 5 Milestone & Midnight Preprod Testing Call!

Calling all Midnight Preprod explorers and community testers!
Test our live privacy terminal, generate private ZK witnesses, and submit your evaluation directly through our embedded telemetry panel.

🧪 Test the MVP: https://thanchanb.github.io/AssetBridge/
💬 Feedback & Bug Bounties: https://thanchanb.github.io/AssetBridge/#feedback

#MidnightPreprod #Blockchain #CardanoEcosystem #AssetBridge
```

---

## 📋 4. Re-Submission Checklist

Before re-submitting to the review team:
- [x] Brand assets created and stored in repo (`brand/profile_avatar.jpg`, `brand/twitter_banner.jpg`, `brand/launch_card.jpg`).
- [x] Repository links updated to `@AssetBridgeZK` in `README.md`, `src/components/Footer.jsx`, `docs/CONTENT_CALENDAR.md`, and audit reports.
- [ ] Product X account profile setup (Avatar & Banner uploaded).
- [ ] Post 1, 2, and 3 published on the product X account.
- [ ] Re-submit link to the judges: `https://x.com/AssetBridgeZK` (or `https://x.com/thanchanb` if rebranded).
