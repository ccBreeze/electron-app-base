import { app } from 'electron'

function registerWindowListener(win) {
  // 当 beforeunload 事件尝试取消页面 unload 时触发
  win.webContents.on('will-prevent-unload', (event) => {
    console.log('🚀 ~ win.webContents.on ~ will-prevent-unload:')
    event.preventDefault() // 忽略渲染进程的 beforeunload 事件处理
  })

  win.on('close', (event) => {
    console.log('🚀 ~ win.on ~ close:')
    // event.preventDefault() // 阻止窗口关闭
  })

  win.on('closed', () => {
    console.log('🚀 ~ win.on ~ closed:')
  })

  testExitApi(win)
}

function registerAppListener() {
  app.on('window-all-closed', () => {
    console.log('🚀 ~ app.on ~ window-all-closed:')
    // if (process.platform !== 'darwin') app.quit()
    app.quit()
  })

  app.on('before-quit', (event) => {
    console.log('🚀 ~ app.on ~ before-quit:')
    // event.preventDefault()
  })

  app.on('will-quit', (event) => {
    console.log('🚀 ~ app.on ~ will-quit:')
    // event.preventDefault()
  })

  app.on('quit', () => {
    console.log('🚀 ~ app.on ~ quit:')
  })
}

function testExitApi(win) {
  // setTimeout(() => {
  //   console.log('🚀 ~ setTimeout ~ setTimeout exec quit')
  //   app.quit()
  //   app.exit()
  //   win.close()
  //   win.destroy()
  // }, 10000)
}

export default function (win) {
  registerWindowListener(win)
  registerAppListener()
}
