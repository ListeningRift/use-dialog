import { resolve } from 'path'
import { defineConfig, LibraryFormats } from 'vite'

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'packages/index.ts'),
        formats: ['es'] as LibraryFormats[],
        fileName: 'index'
      },
      rollupOptions: {
        external: ['vue']
      }
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
})
