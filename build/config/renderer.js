import path from 'path'
import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

const getResolvePath = (dir) => path.resolve(process.cwd(), dir)

export const rendererConfig = {
  renderer: {
    resolve: {
      alias: {
        '@': getResolvePath('src/renderer/src')
      }
    },
    plugins: [vue()]
  }
}

export default defineConfig(rendererConfig)
