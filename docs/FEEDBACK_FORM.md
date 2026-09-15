# AssetBridge — Simple User Feedback Form Specification

This document defines the simple 8-field feedback collection questionnaire for testnet participants evaluating AssetBridge on the Midnight Preprod network.

## Feedback Collection Methods

- **Primary (In-App):** Testers submit directly via the embedded dApp feedback module ([`src/components/Feedback.jsx`](../src/components/Feedback.jsx)).
- **Secondary (Direct Submission):** Testers provide responses directly to the maintainer following the [`docs/TESTER_ONBOARDING.md`](./TESTER_ONBOARDING.md) guide.

---

## 8-Field Feedback Schema

| # | Field Name | Input Type | Description / Prompt |
| - | ---------- | ---------- | -------------------- |
| 1 | **Tester ID** | Text | Assigned identifier or privacy alias (e.g. `AB-001`). |
| 2 | **Date** | Date | Date of testing session (`YYYY-MM-DD`). |
| 3 | **Midnight Preprod Wallet Address** | Text | Public Midnight wallet address used during testing session. |
| 4 | **Functionality Tested** | Select | Target module (`Asset Shielding`, `Wallet Connection`, `Proof Progress Loader`, `UI Layout`, `Other`). |
| 5 | **What Worked Well** | Text | Positive observations or features that functioned smoothly. |
| 6 | **What Was Confusing** | Text | Friction points, unclear instructions, or latency concerns. |
| 7 | **What Should Be Improved** | Text | Suggestions for enhancements or UI/UX tweaks. |
| 8 | **Overall Rating** | Scale (1–5) | Overall product experience rating from 1 Star (Poor) to 5 Stars (Excellent). |

---

> [!NOTE]
> **Data Handling:** All submitted feedback is reviewed by the maintainer and logged in [`docs/FEEDBACK_LOOP.md`](./FEEDBACK_LOOP.md) to drive product fixes and feature iterations.
