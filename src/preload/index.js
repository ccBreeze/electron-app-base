import { contextBridge } from 'electron'
const { ipcRenderer } = require('electron')

import packageJson from '../../package.json'

// Custom APIs for renderer
const api = {
  packageJson,
  updateAsarAppPackage: (buffer) => ipcRenderer.send('updateAsarAppPackage', buffer)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('api', api)
} else {
  window.api = api
}
