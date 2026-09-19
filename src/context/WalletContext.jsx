import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const WalletContext = createContext(null);

// Exactly the 4 networks supported by Midnight Lace wallet
const SUPPORTED_NETWORKS = ['preprod', 'undeployed', 'preview', 'mainnet'];

export const getMidnightWallet = () => {
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
    console.log('[AssetBridge] Connecting to Midnight Lace wallet. Wallet keys:', Object.keys(wallet));

    try {
      let api = null;
      let usedNetwork = preferredNetwork;
      let lastErr = null;

      // 1. Try wallet.enable() first if available (Triggers Lace Extension Popup)
      if (typeof wallet.enable === 'function') {
        try {
          console.log('[AssetBridge] Attempting wallet.enable()...');
          api = await wallet.enable();
        } catch (err) {
          console.warn('[AssetBridge] wallet.enable() failed:', err.message);
          lastErr = err;
          const msg = (err.message || '').toLowerCase();
          if (msg.includes('rejected') || msg.includes('canceled') || msg.includes('declined')) {
            throw err;
          }
        }
      }

      // 2. Try supported networks sequentially matching Lace active network
      if (!api && typeof wallet.connect === 'function') {
        const networksToTry = Array.from(new Set([preferredNetwork, ...SUPPORTED_NETWORKS]));

        for (const netId of networksToTry) {
          try {
            console.log(`[AssetBridge] Attempting wallet.connect('${netId}')...`);
            api = await wallet.connect(netId);
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
        throw lastErr || new Error('Could not connect to Lace. Please verify your Lace wallet network settings.');
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

      // Auto-dismiss success notification banner after 4.5s
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
