<script setup lang="ts">
import {onMounted} from "vue";
import {useMiniApp} from "vue-tg";

const {initData} = useMiniApp()

onMounted(() => {
  console.log(initData)
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
