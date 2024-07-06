/** 1. 测试参数传递不支持的类型 */
export const testInvokeParamsForPromise = async () => {
  const p = Promise.resolve(1)
  await window.api.testInvokeParams(p)
}

/** 2. 测试参数传递 Object（定义原型链）并返回 */
export const testInvokeParams = async () => {
  class A {
    static a = 1
  }
  class B extends A {
    static b = 2
    c = 2
  }
  Object.prototype.d = 3

  const obj = new B()
  const result = await window.api.testInvokeParams(obj)
  console.log('🚀 ~ testInvokeParams ~ obj:', obj)
  console.log('🚀 ~ testInvokeParams ~ result:', result)

  console.log('🚀 ~ test ~ Object.is(obj, result):', Object.is(obj, result))
}

/** 3. 测试主进程返回值 Promise */
export const testInvokeReturn = async () => {
  // 渲染进程定义的 Promise 实例
  const p = Promise.resolve(1)
  p.abort = () => {}
  console.log('🚀 ~ testInvokeReturn ~ p:', p)

  const result = window.api.testInvokeReturn()
  console.log('🚀 ~ testInvokeReturn ~ result:', result)
}

/** 4.1 渲染进程传递 AbortController 对象 */
export const testInvokeParamsAbortController = () => {
  const controller = new AbortController()
  window.api.testInvokeParamsAbortController(controller)
  // ƒ abort() { [native code] }
  console.log('🚀 ~ testInvokeReturnAbortController ~ controller.abort:', controller.abort)
  // AbortController {signal: AbortSignal}
  console.log('🚀 ~ testInvokeReturnAbortController ~ controller:', controller)
  // [object AbortController]
  console.log(
    '🚀 ~ testInvokeReturnAbortController ~ controller Type:',
    Object.prototype.toString.call(controller)
  )
  setTimeout(() => {
    controller.abort() // 无效
  }, 200)
}

/** 4.2 主进程返回 AbortController 对象 */
export const testInvokeReturnAbortController = async () => {
  const controller = await window.api.testInvokeReturnAbortController()
  console.log(
    '🚀 ~ testInvokeReturnAbortController ~ controller:',
    controller.abort,
    controller,
    Object.prototype.toString.call(controller)
  ) // undefined {} [object Object]
  setTimeout(() => {
    controller.abort?.() // 不存在
  }, 200)
}
