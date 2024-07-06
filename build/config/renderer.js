import path from 'path'
import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import compressRenderer from '../plugins/rollup-plugin-compress-renderer.js'

const getResolvePath = (dir) => path.resolve(process.cwd(), dir)

const isCompressRenderer = process.argv.includes('--compress')

export const rendererConfig = {
  renderer: {
    resolve: {
      alias: {
        '@': getResolvePath('src/renderer/src'),
      },
    },
    plugins: [vue(), isCompressRenderer && compressRenderer()],
  },
}

export default defineConfig(rendererConfig)
