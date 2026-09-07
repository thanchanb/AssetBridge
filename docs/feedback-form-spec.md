# AssetBridge - Preprod User Feedback Form Specification

This document contains the exact field specification to copy-paste into Google Forms for creating the **AssetBridge Preprod Early Adopter Feedback Form**.

---

## 📋 Form Overview

* **Form Title:** `AssetBridge Preprod User Feedback & Satisfaction Survey`
* **Form Description:** `Thank you for testing AssetBridge on Cardano Preprod / Midnight! Your feedback directly shapes our privacy-preserving asset bridging protocol. Please complete this brief survey.`

---

## 📝 Form Fields Specification

### 1. Participant Details (Required)

#### Field 1: Full Name
* **Question Text:** `Full Name`
* **Type:** Short answer
* **Required:** Yes
* **Validation:** None

#### Field 2: Email Address
* **Question Text:** `Email Address`
* **Type:** Short answer
* **Required:** Yes
* **Validation:** Email address format check

#### Field 3: Wallet Address
* **Question Text:** `Preprod / Preview Wallet Address`
* **Type:** Short answer
* **Required:** Yes
* **Description:** `Enter your Cardano Preprod or Midnight testnet wallet address (e.g., addr_test1...)`

---

### 2. Product Evaluation (Required)

#### Field 4: Overall Product Rating
* **Question Text:** `Overall Product Rating`
* **Type:** Linear scale (1 to 5)
* **Scale Labels:** `1 = Poor / Unusable`, `5 = Excellent / Exceptional`
* **Required:** Yes

---

### 3. Detailed Feedback Questions (Selected Top 5)

#### Field 5: Favorite Feature
* **Question Text:** `Which feature did you like the most?`
* **Type:** Multiple choice (with "Other" write-in option)
* **Options:**
  - `Zero-Knowledge (ZK) Proof Shielding`
  - `Multi-Stage ZK Compilation Stepper`
  - `Lace / Extension Wallet Connection Flow`
  - `Privacy Model & Non-Custodial Security`
  - `Embedded In-App Feedback Widget`
  - `Other...`
* **Required:** Yes

#### Field 6: Missing Features
* **Question Text:** `What feature do you think is missing or should be added next?`
* **Type:** Paragraph
* **Required:** Yes

#### Field 7: Bugs & Usability Issues
* **Question Text:** `Did you encounter any bugs, errors, or usability issues during bridging?`
* **Type:** Paragraph
* **Required:** Yes

#### Field 8: Recommendation (NPS)
* **Question Text:** `Would you recommend AssetBridge to other Web3 privacy developers?`
* **Type:** Linear scale (1 to 10)
* **Scale Labels:** `1 = Definitely Not`, `10 = Highly Likely`
* **Required:** Yes

#### Field 9: Proposed Improvements
* **Question Text:** `What improvements would you like to see in future releases?`
* **Type:** Paragraph
* **Required:** Yes

---

## 🔗 Setup Instructions for Admin

1. Open [Google Forms](https://forms.google.com).
2. Click **Blank Form** and paste the title and description above.
3. Add the 9 fields using the exact configurations detailed above.
4. Click **Responses** tab ➔ **Link to Sheets** ➔ Create a new spreadsheet named `AssetBridge User Feedback Responses`.
5. Share the Google Sheet as **Anyone with the link can view** (view-only).
6. Copy the public Google Form URL and Google Sheet URL, and update the corresponding links in `README.md`.
