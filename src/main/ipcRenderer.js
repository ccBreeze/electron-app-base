import { ipcMain, app, dialog } from 'electron'
import path from 'path'
import AdmZip from 'adm-zip'
import log from 'electron-log'

ipcMain.on('unzipRendererZip', async (event, blob) => {
  log.info('app.getAppPath():', app.getAppPath())
  const targetPath = path.join(app.getAppPath(), 'out', 'renderer')
  log.info('🚀 ~ ipcMain.on ~ targetPath:', targetPath)
  const buffer = await new Response(blob).arrayBuffer()
  const zip = new AdmZip(new Uint8Array(buffer))
  zip.extractAllTo(targetPath, true)
  // 解压成功，提示重启

  const choice = await dialog.showMessageBox({
    type: 'info',
    title: '重启应用',
    message: '为了使更改生效，应用需要重启。您现在是否要重启？',
    buttons: ['重启', '稍后'],
    cancelId: 1 // 设置“稍后”为取消按钮
  })
  if (choice.response === 0) {
    // 用户选择了重启
    app.relaunch() // 准备重启应用
    app.quit() // 关闭当前应用实例，触发重启
  }
})
