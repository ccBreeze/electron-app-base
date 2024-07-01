import { defineConfig } from 'electron-vite'

import { mainConfig } from './main.js'
import { rendererConfig } from './renderer.js'

export default defineConfig({
  ...mainConfig,
  ...rendererConfig
})
