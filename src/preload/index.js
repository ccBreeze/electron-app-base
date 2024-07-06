import { contextBridge, ipcRenderer } from 'electron'

import testIpcParamsAndResult from './testIpcParamsAndResult.js'
import packageJson from '../../package.json'

// Custom APIs for renderer
const api = {
  ...testIpcParamsAndResult,
  packageJson,
  updateAppAsar: (buffer) => ipcRenderer.send('updateAppAsar', buffer),
  updateAppAsarUnpacked: (buffer) => ipcRenderer.send('updateAppAsarUnpacked', buffer),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

// 上下文隔离 webview(local)
if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('api', api)
}
// 远程托管 webview(URL)
else {
  window.api = api
}
