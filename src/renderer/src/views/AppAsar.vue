<template>
  <div>当前版本：{{ info.version }}</div>
  <div>服务器版本：{{ info.serverVersion }}</div>
  <button v-if="info.isNeedUpdate" @click="handleUpdate">更新</button>
  <h1 v-else>我已经更新了</h1>
</template>

<script setup>
import { reactive } from 'vue'

const info = reactive({
  version: window.api.packageJson.version,
  serverVersion: '',
  isNeedUpdate: false
})

;(async function getVersion() {
  const res = await fetch('http://localhost:8080/api/version')
  const data = await res.json()
  // 需要更新
  info.serverVersion = data.version
  if (data.version !== info.version) {
    info.isNeedUpdate = true
  }
})()

const handleUpdate = async () => {
  const response = await fetch('http://localhost:8080/app.zip') // 请求ZIP文件
  const blob = await response.blob()
  const buffer = await new Response(blob).arrayBuffer()
  window.api.updateAsarAppPackage(buffer)
}
</script>
