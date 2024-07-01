<template>
  <div class="container">
    <!-- <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view> -->
    <router-link to="/UnpackAsar">跳转 UnpackAsar 页面</router-link>

    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
