# AssetBridge — Feedback Loop & Iteration Record (Level 5)

During the **Midnight Level 5 (Full Moon)** milestone, AssetBridge incorporates an in-dApp feedback collection panel ([`src/components/Feedback.jsx`](./src/components/Feedback.jsx)) to gather structured user telemetry directly from Midnight Preprod testnet participants.

## Feedback Architecture

1. **In-DApp Rating Panel:** Users rate product experience (1–5 stars) and submit text feedback directly in the UI layout.
2. **Telemetry Export Script:** Automated Node.js pipeline script ([`scripts/export_feedback.js`](./scripts/export_feedback.js)) exports submitted telemetry to JSON dataset format ([`feedback/responses-export.json`](./feedback/responses-export.json)).
3. **Iteration Ledger:** Verified user reports and resulting git commits are recorded in [`docs/FEEDBACK_LOOP.md`](./docs/FEEDBACK_LOOP.md).

> [!NOTE]
> All feedback records logged in [`docs/FEEDBACK_LOOP.md`](./docs/FEEDBACK_LOOP.md) represent genuine user interactions and verified product code commits.
