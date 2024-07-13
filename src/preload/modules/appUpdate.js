import { ipcRenderer } from 'electron'

export default {
  updateAppAsar: (buffer) => ipcRenderer.send('updateAppAsar', buffer),
  updateAppAsarUnpacked: (buffer) => ipcRenderer.send('updateAppAsarUnpacked', buffer),
}
