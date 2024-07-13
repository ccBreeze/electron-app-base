import fs from 'fs'
import { ipcMain } from 'electron'
import axios from 'axios'

// 下载文件夹到指定目录
export const downloadFileToFolder = async (event, { url, outputPath, signal }) => {
  console.log('🚀 ~ file: download.js:7 ~ downloadFileToFolder ~ url:', url)
  console.log('🚀 ~ file: download.js:7 ~ downloadFileToFolder ~ outputPath:', outputPath)
  const writer = fs.createWriteStream(outputPath)

  let receivedBytes = 0
  const response = await axios({
    url,
    signal,
    method: 'get',
    responseType: 'stream',
  })

  const totalBytes = response.headers['content-length']
  let progress = 0
  response.data.on('data', (chunk) => {
    receivedBytes += chunk.length
    const total = Math.floor((receivedBytes / totalBytes) * 100)
    // 节流 - 发送进度给渲染进程
    if (total !== progress) {
      progress = total
      event.sender.send('onDownloadProgress', progress)
    }
  })
  response.data.pipe(writer)
  response.data.on('error', (err) => {
    event.sender.send('onDownloadProgress', -1)
    console.error('数据读取过程中发生错误:', err)
  })

  // TODO: onerror 是否删除文件

  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      resolve(outputPath)
    })
    writer.on('error', reject)
  })
}

export default function () {
  ipcMain.handle('downloadFileToFolder', downloadFileToFolder)
}
