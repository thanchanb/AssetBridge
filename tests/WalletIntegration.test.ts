import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Midnight Lace Wallet Integration Logic', () => {
  const originalMidnight = (globalThis as any).window?.midnight;

  beforeEach(() => {
    // Reset window.midnight before each test
    if (!(globalThis as any).window) {
      (globalThis as any).window = {};
    }
    delete (globalThis as any).window.midnight;
  });

  afterEach(() => {
    if (originalMidnight) {
      (globalThis as any).window.midnight = originalMidnight;
    } else {
      delete (globalThis as any).window.midnight;
    }
  });

  it('Path 1: should detect when Lace extension is NOT present and reject without fake state', async () => {
    let connected = false;
    let walletAddress: string | null = null;
    let walletError: string | null = null;

    // Simulate wallet connection attempt without extension
    const connect = async () => {
      if (!(globalThis as any).window?.midnight?.mnLace) {
        connected = false;
        walletAddress = null;
        walletError = 'Midnight Lace wallet extension not found. Please install the Lace extension to connect.';
        return false;
      }
      return true;
    };

    const success = await connect();

    expect(success).toBe(false);
    expect(connected).toBe(false);
    expect(walletAddress).toBeNull();
    expect(walletError).toContain('not found');
  });

  it('Path 2: should successfully connect when Lace extension is detected and returns valid state', async () => {
    let connected = false;
    let walletAddress: string | null = null;
    let walletError: string | null = null;

    // Simulate Lace extension injected by browser
    (globalThis as any).window.midnight = {
      mnLace: {
        enable: vi.fn().mockResolvedValue({
          state: vi.fn().mockResolvedValue({
            address: 'mn_addr_preprod_test_abc123456789'
          })
        })
      }
    };

    const connect = async () => {
      if (!(globalThis as any).window?.midnight?.mnLace) {
        walletError = 'Lace extension not found';
        return false;
      }
      try {
        const api = await (globalThis as any).window.midnight.mnLace.enable();
        const state = await api.state();
        if (!state?.address) throw new Error('No address returned');
        walletAddress = state.address;
        connected = true;
        return true;
      } catch (err: any) {
        walletError = err.message;
        connected = false;
        walletAddress = null;
        return false;
      }
    };

    const success = await connect();

    expect(success).toBe(true);
    expect(connected).toBe(true);
    expect(walletAddress).toBe('mn_addr_preprod_test_abc123456789');
    expect(walletError).toBeNull();
  });

  it('Path 3: should handle user rejection in Lace modal cleanly without setting fake state', async () => {
    let connected = false;
    let walletAddress: string | null = null;
    let walletError: string | null = null;

    // Simulate user rejecting the popup modal in Lace
    (globalThis as any).window.midnight = {
      mnLace: {
        enable: vi.fn().mockRejectedValue(new Error('User rejected authorization'))
      }
    };

    const connect = async () => {
      if (!(globalThis as any).window?.midnight?.mnLace) {
        return false;
      }
      try {
        const api = await (globalThis as any).window.midnight.mnLace.enable();
        const state = await api.state();
        walletAddress = state.address;
        connected = true;
        return true;
      } catch (err: any) {
        walletError = err.message;
        connected = false;
        walletAddress = null;
        return false;
      }
    };

    const success = await connect();

    expect(success).toBe(false);
    expect(connected).toBe(false);
    expect(walletAddress).toBeNull();
    expect(walletError).toBe('User rejected authorization');
  });
});
