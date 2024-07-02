import path from 'path'
import AdmZip from 'adm-zip'

const NAME = 'compress-renderer'

export default function compressRendererPlugin(params = {}) {
  return {
    name: NAME,

    async writeBundle(options) {
      // 默认值
      Object.assign(params, {
        // 如果输出在 out 目录会被打包到 app.asar 中
        outputPath: path.join(process.cwd(), 'dist/renderer.zip')
      })

      const zip = new AdmZip()
      zip.addLocalFolder(options.dir)
      zip.writeZip(params.outputPath)
      console.log(`${NAME} successful！`)
      console.log(`${NAME} path: ${params.outputPath}`)

      // TODO: 上传OSS
    }
  }
}
