// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ▶️ This plugin automatically prunes unused MUI imports (especially the huge icons package)
import muiOptimizer from 'vite-plugin-mui-optimizer';

export default defineConfig({
  plugins: [
    react(),
    muiOptimizer(),             // ✅ Tree-shake MUI imports (icons, lab, etc.)
  ],
  optimizeDeps: {
    // Make sure Vite doesn’t eagerly scan the entire icons-material directory
    exclude: ['@mui/icons-material'],
  },
  build: {
    sourcemap: false,           // 🔥 Turn off source maps in prod to reduce file reads
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Optional: manually chunk vendor code if needed
        manualChunks: {
          // e.g. reactVendor: ['react','react-dom']
        },
      },
    },
    commonjsOptions: {
      // Only run CJS conversion on your source and truly needed deps
      include: [/node_modules\/vite-plugin-mui-optimizer/, /node_modules\/@mui/],
    },
  },
});
