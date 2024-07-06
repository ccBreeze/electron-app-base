import { ipcMain } from 'electron'
import path from 'path'

import { downloadFileToFolder } from './download.js'

/** 2. 测试参数传递 Object（定义原型链）并返回 */
const testInvokeParams = (e, obj) => {
  console.log('🚀 ~ testInvokeParams ~ obj.a:', obj.a) // undefined
  console.log('🚀 ~ testInvokeParams ~ obj.b:', obj.b) // undefined
  console.log('🚀 ~ testInvokeParams ~ obj.c:', obj.c) // 2
  console.log('🚀 ~ testInvokeParams ~ obj.d:', obj.d) // undefined
  console.log('🚀 ~ testInvokeParams ~ obj:', obj) // { c: 2 }
  return obj
}

/** 3. 测试主进程返回值 Promise */
const testInvokeReturn = (e) => {
  const p = Promise.resolve(1)
  p.abort = () => {} // 实例定义属性
  console.log('🚀 ~ testInvokeReturn ~ p.abort:', p.abort) // [Function (anonymous)]
  return p
}

const FILE_URL = 'http://localhost:8080/renderer.zip'
const OUTPUT_PATH = path.join(process.cwd(), 'out/renderer.zip')

/** 4.1 渲染进程传递 AbortController 对象 */
const testInvokeParamsAbortController = async (e, controller) => {
  console.log(
    '🚀 ~ testInvokeAxiosParams ~ controller:',
    controller.abort,
    controller,
    Object.prototype.toString.call(controller)
  ) // undefined {} [object Object]

  await downloadFileToFolder(e, {
    url: FILE_URL,
    outputPath: OUTPUT_PATH,
    sial: controller.signal,
  })
}

/** 4.2 主进程返回 AbortController 对象 */
const testInvokeReturnAbortController = (e) => {
  const controller = new AbortController()
  downloadFileToFolder(e, {
    url: FILE_URL,
    outputPath: OUTPUT_PATH,
    sial: controller.signal,
  })
  // [Function: abort]
  //  AbortController { signal: AbortSignal { aborted: false } }
  // [object AbortController]
  console.log(
    '🚀 ~ testInvokeAxiosParams ~ controller:',
    controller.abort,
    controller,
    Object.prototype.toString.call(controller)
  )
  return controller
}

ipcMain.handle('testInvokeParams', testInvokeParams)
ipcMain.handle('testInvokeReturn', testInvokeReturn)
ipcMain.handle('testInvokeParamsAbortController', testInvokeParamsAbortController)
ipcMain.handle('testInvokeReturnAbortController', testInvokeReturnAbortController)
