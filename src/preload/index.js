import { contextBridge } from 'electron'
const { ipcRenderer } = require('electron')

import packageJson from '../../package.json'

// Custom APIs for renderer
const api = {
  packageJson,
  updateAppAsar: (buffer) => ipcRenderer.send('updateAppAsar', buffer),
  updateAppAsarUnpacked: (buffer) => ipcRenderer.send('updateAppAsarUnpacked', buffer)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('api', api)
} else {
  window.api = api
}
