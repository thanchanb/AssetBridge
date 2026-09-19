import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wasm(),
    nodePolyfills({
      include: ['buffer', 'crypto', 'stream', 'util', 'events', 'path'],
    })
  ],
  optimizeDeps: {
    include: ['object-inspect'],
    exclude: ['@midnight-ntwrk/compact-runtime', '@midnight-ntwrk/onchain-runtime-v3'],
  },
  build: {
    target: 'es2022',
  },
  base: '/AssetBridge/',
});
