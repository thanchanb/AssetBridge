# AssetBridge 🌔

[![CI/CD Pipeline](https://github.com/thanchanb/AssetBridge/actions/workflows/ci.yml/badge.svg)](https://github.com/thanchanb/AssetBridge/actions/workflows/ci.yml)

**Level 6 - Supermoon Submission**

AssetBridge is the privacy-critical core of your next-generation asset transfer protocol. Utilizing cutting-edge Zero-Knowledge Proofs, it enables users to seamlessly bridge assets across chains without exposing the sender, receiver, or amount transferred.

## 🔗 Submission Details

*   **Product X Profile:** [https://x.com/AssetBridgeZK](https://x.com/AssetBridgeZK) (Official product profile with updates and roadmap)
*   **Live Preprod Demo:** [https://thanchanb.github.io/AssetBridge/](https://thanchanb.github.io/AssetBridge/) 
*   **Smart Contract Address (Preprod):** `addr_test1zz5yljl0qx7dwjpgyg3gm6xez0a0wg00p7czt0vwlwhkkt9rj4wrmuu0fsz3q5kppfyhhspgztc5a7gjz5n05r92xj7sr9l7td` [(View on Explorer)](#)
*   **Demo Video:** [View Demo Video Recording Here (WebP format)](https://github.com/thanchanb/AssetBridge/blob/main/assetbridge_demo_v2.webp)
*   **Level 6 Launch Users:** [View Launch Users (LAUNCH_USERS.md)](./LAUNCH_USERS.md)
*   **Supermoon Feedback:** [View Feedback Report (FEEDBACK.md)](./FEEDBACK.md)
*   **Project Proposal:** [View Technical Proposal (PROPOSAL.md)](./PROPOSAL.md)
*   **Brand Assets:** [View Brand Visuals & Brief (brand/)](./brand/)

## 🚀 Setup & Installation

To run this project locally, follow these steps:

1.  Clone the repository:
    ```bash
    git clone https://github.com/thanchanb/AssetBridge.git
    cd AssetBridge
    ```
2.  Install dependencies:
    ```bash
    git checkout main
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## 🔒 Privacy Model

AssetBridge enforces a strict, multi-layered privacy model designed around cryptographic security and absolute user sovereignty:

- **Client-Side Proof Generation (On-Client)**: Zero-Knowledge proofs are compiled and generated entirely inside the user's browser via the Midnight Web SDK bindings. No transaction payloads, keys, or private inputs are ever transmitted to a centralized server.
- **Non-Custodial Design**: Users interact directly with smart contract scripts via their connected web wallets. The protocol never stores, claims, or controls user funds, maintaining a trustless custody flow.
- **Ledger-Level Privacy**: Public ledger updates are restricted to global metadata (such as Total Value Locked). Individual transaction parameters (depositor identity, shielding destinations, and transaction quantities) remain private in the ZK proof.

## 📈 Feedback & Iterations

We conducted iterative testing with early adopters to refine the user experience of AssetBridge. Feedback loops and our prioritization methodologies are fully documented in our **[Feedback Report (FEEDBACK.md)](./FEEDBACK.md)**. 

Key improvements deployed include:
- A real-time, multi-step progress state loader in `Bridge.jsx` to guide users during ZK proof compilation.
- The `Feedback.jsx` component embedded directly inside the bridge UI for direct user communication.

## 👥 Level 6 Users

To validate the deployment of AssetBridge on the Cardano Preprod testnet, we onboarded and verified a cohort of launch testers. Their addresses and launch transaction timestamps are recorded in **[Launch Users (LAUNCH_USERS.md)](./LAUNCH_USERS.md)**.

## 📖 Usage & Architecture

Please refer to the [USAGE.md](./docs/USAGE.md) for detailed instructions on how to use the bridge interface.

Our Midnight Architecture:
- **[Compact Contracts](./contracts/)**: Defines our public/private state model using zero-knowledge proofs.
- **[Generated Bindings](./managed/)**: Auto-generated typescript SDK from the compact compiler to connect our frontend to Preprod.

## 🛠 Features

*   **Privacy-First:** Midnight Compact ZK circuit implementation for absolute privacy.
*   **Stunning UI:** Premium glassmorphism design with responsive micro-animations.
*   **CI/CD Integrated:** Automated testing and build pipelines via GitHub Actions.

## 🤝 Contributing

This project is built for the Supermoon submission, finalizing our Level 6 milestones and completing the core private asset bridging features!

