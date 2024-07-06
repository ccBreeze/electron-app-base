import { ipcRenderer } from 'electron'

export default {
  testInvokeParams: (params) => ipcRenderer.invoke('testInvokeParams', params),
  testInvokeReturn: () => ipcRenderer.invoke('testInvokeReturn'),
  testInvokeParamsAbortController: (controller) =>
    ipcRenderer.invoke('testInvokeParamsAbortController', controller),
  testInvokeReturnAbortController: () => ipcRenderer.invoke('testInvokeReturnAbortController'),
}
