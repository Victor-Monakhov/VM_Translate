import {defineConfig} from 'electron-vite';
import path from 'path';

export default defineConfig({
  main: {
    build: {
      outDir: 'dist/electron',
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'electron/__init.ts')
        }
      },
    }
  },
  preload: {
    build: {
      outDir: 'dist/electron-preload',
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'electron-preload/preload.ts')
        }
      },
    }
  },
});
