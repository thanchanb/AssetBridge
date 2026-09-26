import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const WalletContext = createContext(null);

// Exactly the 4 networks supported by Midnight Lace wallet
const SUPPORTED_NETWORKS = ['preprod', 'undeployed', 'preview', 'mainnet'];

const getMidnightWallet = () => {
  if (typeof window === 'undefined' || !window.midnight) {
    return null;
  }
  
  if (window.midnight.mnLace) return window.midnight.mnLace;
  if (window.midnight.lace) return window.midnight.lace;
  if (window.midnight.midnightLace) return window.midnight.midnightLace;
  
  const wallets = Object.values(window.midnight);
  if (wallets.length > 0 && typeof wallets[0] === 'object') {
    return wallets[0];
  }
  
  return null;
};

const ensureStringAddress = (rawAddress) => {
  if (!rawAddress) return null;
  if (typeof rawAddress === 'string') return rawAddress;
  if (typeof rawAddress === 'object') {
    if (typeof rawAddress.address === 'string') return rawAddress.address;
    if (typeof rawAddress.unshieldedAddress === 'string') return rawAddress.unshieldedAddress;
    if (typeof rawAddress.shieldedAddress === 'string') return rawAddress.shieldedAddress;
    if (typeof rawAddress.toString === 'function' && rawAddress.toString() !== '[object Object]') {
      return rawAddress.toString();
    }
  }
  return String(rawAddress);
};

export const WalletProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletApi, setWalletApi] = useState(null);
  const [activeNetwork, setActiveNetwork] = useState('preprod');
  const [walletError, setWalletError] = useState(null);
  const [hasExtension, setHasExtension] = useState(false);

  // Poll for window.midnight injection
  useEffect(() => {
    const checkExtension = () => {
      const wallet = getMidnightWallet();
      setHasExtension(Boolean(wallet));
    };

    checkExtension();
    const interval = setInterval(checkExtension, 500);
    return () => clearInterval(interval);
  }, []);

  const connect = useCallback(async (preferredNetwork = 'preprod') => {
    setWalletError(null);
    setConnectionSuccess(false);

    const wallet = getMidnightWallet();

    if (!wallet) {
      setConnected(false);
      setWalletAddress(null);
      setWalletApi(null);
      setWalletError('Midnight Lace wallet extension not found on window.midnight. Please ensure Lace is enabled for this page and refresh.');
      return false;
    }

    setConnecting(true);
    console.log('[AssetBridge] Target Midnight Lace wallet:', wallet);

    // Timeout helper (30s max so user has time to click Approve in Lace)
    const withTimeout = (promise, ms = 30000, label = 'Lace operation') => {
      return Promise.race([
        promise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`${label} timed out. Please click the Lace extension icon 🦊 in your browser bar to approve connection.`)), ms)
        )
      ]);
    };

    try {
      let api = null;
      let usedNetwork = preferredNetwork;
      let lastErr = null;

      // Find enable or connect methods across target wallet and prototype chain
      const connectFn = wallet.connect || wallet.enable || (wallet.__proto__ && (wallet.__proto__.connect || wallet.__proto__.enable));

      if (typeof connectFn !== 'function') {
        throw new Error('Lace extension found, but no connect() or enable() method is available.');
      }

      // Priority 1: Call connect() with NO parameters (connects to Lace's current active network)
      try {
        console.log('[AssetBridge] Calling wallet.connect()...');
        api = await withTimeout(connectFn.call(wallet), 30000, 'Lace authorization popup');
      } catch (err) {
        console.warn('[AssetBridge] wallet.connect() without params failed:', err.message);
        lastErr = err;
        const msg = (err.message || '').toLowerCase();
        if (msg.includes('rejected') || msg.includes('canceled') || msg.includes('declined')) {
          throw err;
        }
      }

      // Priority 2: Call connect(preferredNetwork) if 0-param call didn't return an API handle
      if (!api) {
        const networksToTry = Array.from(new Set([preferredNetwork, ...SUPPORTED_NETWORKS]));

        for (const netId of networksToTry) {
          try {
            console.log(`[AssetBridge] Calling wallet.connect('${netId}')...`);
            api = await withTimeout(connectFn.call(wallet, netId), 30000, `Lace connection (${netId})`);
            if (api) {
              usedNetwork = netId;
              console.log(`[AssetBridge] Connected to Lace on network: '${netId}'`);
              break;
            }
          } catch (err) {
            console.warn(`[AssetBridge] wallet.connect('${netId}') failed:`, err.message);
            lastErr = err;
            const msg = (err.message || '').toLowerCase();
            if (msg.includes('rejected') || msg.includes('canceled') || msg.includes('declined')) {
              throw err;
            }
          }
        }
      }

      if (!api) {
        if (lastErr && lastErr.message && lastErr.message.includes('Network ID mismatch')) {
          throw new Error('Network ID mismatch: Please check your Lace extension settings ⚙️ and select Midnight Preprod.');
        }
        throw lastErr || new Error('Could not connect to Lace. Please check your Lace wallet extension icon 🦊 in browser bar.');
      }

      // Extract address using available DApp connector API methods
      let rawAddress = null;
      if (typeof api.state === 'function') {
        const state = await api.state();
        console.log('[AssetBridge] Connected wallet state:', state);
        rawAddress = state?.address || state?.unshieldedAddress || state?.shieldedAddress || state;
      }
      
      if (!rawAddress && typeof api.getUnshieldedAddress === 'function') {
        rawAddress = await api.getUnshieldedAddress();
      }

      if (!rawAddress && typeof api.getShieldedAddresses === 'function') {
        const shielded = await api.getShieldedAddresses();
        rawAddress = Array.isArray(shielded) ? shielded[0] : shielded;
      }

      if (!rawAddress && typeof api.getDustAddress === 'function') {
        rawAddress = await api.getDustAddress();
      }

      const addressStr = ensureStringAddress(rawAddress);

      if (!addressStr) {
        throw new Error('Could not retrieve address from Lace. Ensure your wallet is unlocked.');
      }

      setWalletApi(api);
      setWalletAddress(addressStr);
      setActiveNetwork(usedNetwork);
      setConnected(true);
      setConnecting(false);
      setConnectionSuccess(true);
      console.log('[AssetBridge] Connected successfully to Lace. Address:', addressStr);

      setTimeout(() => {
        setConnectionSuccess(false);
      }, 4500);

      return true;
    } catch (err) {
      console.error('[AssetBridge] Wallet connection error:', err);
      setConnected(false);
      setWalletAddress(null);
      setWalletApi(null);
      setConnecting(false);
      setConnectionSuccess(false);
      setWalletError(err.message || 'Lace connection request failed or was rejected.');
      return false;
    }
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
    setConnectionSuccess(false);
    setWalletAddress(null);
    setWalletApi(null);
    setWalletError(null);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        connected,
        connecting,
        connectionSuccess,
        walletAddress,
        walletApi,
        activeNetwork,
        walletError,
        hasExtension,
        connect,
        disconnect,
        clearError: () => setWalletError(null),
        dismissSuccess: () => setConnectionSuccess(false)
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
