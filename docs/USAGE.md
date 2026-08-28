# AssetBridge Usage Guide

## Getting Started

1. Connect your Ethereum Wallet (e.g., MetaMask).
2. Ensure you are on the supported network (Ethereum Mainnet or Testnet for bridging).
3. Select the amount of ETH you want to bridge to the Midnight Network.
4. Click "Generate ZK Proof & Bridge".
5. Wait for the transaction to be generated, confirmed on the source chain, and finally confirmed on the destination chain (Preprod).

## Privacy Note
AssetBridge utilizes Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (zk-SNARKs) to ensure that the sender, receiver, and amount remain entirely hidden from the public ledger, guaranteeing total privacy for your cross-chain assets.

## Level 5 User Validation

### Feedback Collection Methodology
To validate the reliability, security, and usability of the AssetBridge MVP during the Full Moon phase (Level 5), we collected feedback from 50 verified early adopters on the Cardano Preprod testnet. This feedback was gathered through:
- **Telemetry Analysis**: Tracking successful proof generation times, wallet connection stability, and transaction confirmation speeds.
- **In-App Feedback Component**: Users submitted direct quantitative ratings and qualitative reports using the `Feedback.jsx` component.
- **Structured Interviews**: Direct check-ins with Web3 developers and privacy advocates regarding cross-chain UX friction.

### Feedback Integration & Iterations
Based on the structured feedback from these 50 preprod users, we identified three critical areas of improvement and successfully integrated them into our recent iterations:
1. **Multi-Stage Bridge Feedback**:
   - *Feedback*: Users were unsure of progress during the multi-stage Zero-Knowledge proof generation and destination chain confirmation.
   - *Resolution*: Updated the `Bridge.jsx` component to show a detailed, multi-step loader (Generating Proof -> Shielding Assets -> Awaiting Preprod Confirmation -> Bridge Success) with clear status updates.
2. **Preprod Wallet Handshake Optimization**:
   - *Feedback*: Developer testers reported occasional wallet disconnection/handshake failure events with browser extension wallets on the Cardano Preprod network.
   - *Resolution*: Refined the connection handler in `Header.jsx` to gracefully recover from dropped connections and poll wallet status with improved debounce logic.
3. **Fee Transparency**:
   - *Feedback*: End-users wanted to see estimated gas costs for both source and destination chains prior to confirming the bridge action.
   - *Resolution*: Integrated upfront estimates for gas on both sides of the bridge directly on the transaction configuration UI.

