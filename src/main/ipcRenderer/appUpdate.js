import { ipcMain, app, dialog } from 'electron'
import path from 'path'
import AdmZip from 'adm-zip'
import log from 'electron-log'
import fs from 'fs'
import fsExtra from 'fs-extra'

// 使用 asar:false 打包后，替换 app 包实现整个应用的更新
// 当然也可以只替换 renderer 文件夹实现，渲染进程热更新
const updateAppAsar = async (event, buffer) => {
  const APP_PATH = app.getAppPath()
  const RESOURCES_PATH = path.join(APP_PATH, '../')
  const ZIP_PATH = path.join(RESOURCES_PATH, 'app.zip')
  log.info('🚀 ~ ipcMain.on ~ APP_PATH:', APP_PATH)
  log.info('🚀 ~ ipcMain.on ~ RESOURCES_PATH:', RESOURCES_PATH)
  log.info('🚀 ~ ipcMain.on ~ ZIP_PATH:', ZIP_PATH)

  // 1. 写入 zip 文件
  fs.writeFile(ZIP_PATH, new Uint8Array(buffer), async function (err) {
    if (err) {
      log.info('写入错误', err)
      return
    }
    // 2. 删除旧的 app 目录
    fsExtra.removeSync(APP_PATH)
    // 3. 读取 zip & 解压文件夹 app
    const zip = new AdmZip(fs.readFileSync(ZIP_PATH))
    zip.extractAllTo(RESOURCES_PATH, true)
    // 4. 删除 zip 包
    fsExtra.remove(ZIP_PATH)

    // 5. 解压成功，提示重启
    const choice = await dialog.showMessageBox({
      type: 'info',
      title: '重启应用',
      message: '为了使更改生效，应用需要重启。您现在是否要重启？',
      buttons: ['重启', '稍后'],
      cancelId: 1, // 设置“稍后”为取消按钮
    })
    // 用户选择了重启
    if (choice.response === 0) {
      app.relaunch() // 准备重启应用
      app.quit() // 关闭当前应用实例，触发重启
    }
  })
}

// 使用 app.asar.unpacked/renderer 访问渲染进程
// 替换该文件夹达到渲染进程更新的目的
const updateAppAsarUnpacked = async (event, buffer) => {
  const APP_PATH = app.getAppPath()
  const UNPACKED_DIR = path.join(APP_PATH, '../app.asar.unpacked')
  const ZIP_PATH = path.join(UNPACKED_DIR, 'renderer.zip')
  log.info('🚀 ~ ipcMain.on ~ APP_PATH:', APP_PATH)
  log.info('🚀 ~ ipcMain.on ~ UNPACKED_DIR:', UNPACKED_DIR)
  log.info('🚀 ~ ipcMain.on ~ ZIP_PATH:', ZIP_PATH)

  // 1. 写入 zip 文件
  fs.writeFile(ZIP_PATH, new Uint8Array(buffer), async function (err) {
    if (err) {
      log.info('写入错误', err)
      return
    }
    // 2. 删除旧的 renderer 目录
    fsExtra.removeSync(path.join(UNPACKED_DIR, 'renderer'))
    // 3. 读取 zip & 解压文件夹 app
    const zip = new AdmZip(fs.readFileSync(ZIP_PATH))
    zip.extractAllTo(UNPACKED_DIR, true)
    // 4. 删除 zip 包
    fsExtra.remove(ZIP_PATH)

    // 5. 解压成功，提示重启
    const choice = await dialog.showMessageBox({
      type: 'info',
      title: '重启应用',
      message: '为了使更改生效，应用需要重启。您现在是否要重启？',
      buttons: ['重启', '稍后'],
      cancelId: 1, // 设置“稍后”为取消按钮
    })
    // 用户选择了重启
    if (choice.response === 0) {
      app.relaunch() // 准备重启应用
      app.quit() // 关闭当前应用实例，触发重启
    }
  })
}

export default function () {
  ipcMain.on('updateAppAsar', updateAppAsar)
  ipcMain.on('updateAppAsarUnpacked', updateAppAsarUnpacked)
}