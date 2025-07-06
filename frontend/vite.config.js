import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // ✅ Fix the ThemeContext build error by using styled-components engine
      '@mui/styled-engine': '@mui/styled-engine-sc',
      'styled-components': path.resolve(__dirname, './node_modules/styled-components'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'hoist-non-react-statics'],
    exclude: ['@mui/icons-material'],
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
