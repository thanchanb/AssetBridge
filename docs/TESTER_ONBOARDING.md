# AssetBridge — Testnet Tester Onboarding Guide 🚀

Thank you for testing **AssetBridge**! Please follow these simple steps to perform your UI testing session and record your genuine evidence for Midnight Level 5 submission evaluation.

---

## Technical Scope Notice for Testers

> [!NOTE]
> **MVP Client Demonstration Mode:**
> AssetBridge demonstrates cross-chain asset shielding UI workflows (`ETH` ➔ `zETH`) powered by Midnight Compact smart contract specifications ([`contracts/AssetBridge.compact`](../contracts/AssetBridge.compact)). Zero-Knowledge proof generation and network transaction confirmation are simulated within browser runtime. Completed sessions return a **Demo Activity ID** (`mn_tx_...`).

---

## 7 Quick Testing Steps

1. **Open AssetBridge:**  
   Navigate to the live dApp: [https://thanchanb.github.io/AssetBridge/](https://thanchanb.github.io/AssetBridge/)

2. **Prepare Your Wallet:**  
   Install or open your **Lace Wallet extension** with Midnight network support.

3. **Verify Target Environment:**  
   Observe the top header badge: **⚡ Midnight Preprod**.

4. **Connect Wallet:**  
   Click **Connect Lace Wallet** in the top navigation bar. If connected to Lace, copy your genuine Midnight wallet address.

5. **Perform Asset Shielding Test:**  
   - In the bridge terminal, enter a test asset amount (e.g., `1.0` ETH).
   - Click **Generate ZK Proof & Bridge**.
   - Watch the multi-stage progress state machine (`Generating ZK Proof (Compact DSL)` ➔ `Confirming on Midnight Preprod`).
   - Copy your generated **Demo Activity ID** (e.g. `mn_tx_...`).

6. **Submit Feedback & Log Evidence:**  
   Scroll down to the **Midnight Level 5 Tester Feedback** section at `#feedback`.
   - Enter your assigned Tester ID (e.g., `AB-001`).
   - Paste your **Genuine Midnight Preprod Wallet Address** (from your Lace Wallet).
   - Select the functionality tested.
   - Answer the feedback questions and select your star rating.
   - Click **Submit Feedback & Log Evidence**.

7. **Notify the Maintainer:**  
   Send your Tester ID (`AB-001`), Genuine Midnight Wallet Address, and Demo Activity ID to the maintainer so your entry can be verified in [`docs/PREPROD_USERS.md`](https://github.com/thanchanb/AssetBridge/blob/main/docs/PREPROD_USERS.md).

---

> [!NOTE]
> Privacy Notice: You may use a privacy alias (e.g. `AB-001`, `Tester A`) to protect your identity on public evidence logs.
