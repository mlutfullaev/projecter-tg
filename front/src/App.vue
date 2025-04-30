<script setup lang="ts">
import {onMounted, watch} from "vue";
import {useMiniApp} from "vue-tg";

const miniApp = useMiniApp()

onMounted(() => {
  console.log(miniApp.initData)
})

watch(miniApp, () => {
  console.log(miniApp.initData)
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
