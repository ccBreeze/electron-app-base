export const registerIpcModules = (win) => {
  const modules = import.meta.glob('./**/*.js', {
    import: 'default',
  })

  for (const path in modules) {
    modules[path]().then((mod) => {
      mod?.(win)
    })
  }
}
