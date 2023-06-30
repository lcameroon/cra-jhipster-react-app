import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin(), splitVendorChunkPlugin()],
  build: {
    target: 'esnext',
    outDir: 'build',
    chunkSizeWarningLimit: 2000,
    sourcemap: true,
    rollupOptions: {
      plugins: [rollupNodePolyFill() as any],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [NodeGlobalsPolyfillPlugin({ buffer: true, process: true }), NodeModulesPolyfillPlugin()],
    },
  },
  resolve: {
    alias: {
      colorette: 'console-browserify',
      'source-map-js': 'source-map',
    },
  },
  server: {
    open: true,
    port: 3001,
  },
});
