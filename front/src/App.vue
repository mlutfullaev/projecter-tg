<script setup lang="ts">
import {onMounted} from "vue";
import {useMiniApp} from "vue-tg";

const miniApp = useMiniApp()
const mockInitData = 'query_id=AAFjxtQ3AgAAAGPG1Ddec1q8&user=%7B%22id%22%3A5231658595%2C%22first_name%22%3A%22%D0%9C%22%2C%22last_name%22%3A%22Lutfullaev%22%2C%22username%22%3A%22mlutfullaev%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FCxsjtJ324JxmAEFMOy0D4PfAWooY3mqdAzVzYM8NCRQZf1BwHvQXqpDjTg7Av2_2.svg%22%7D&auth_date=1746008738&signature=ziauc1_AInJ5BlcQxu-ZiHrI8eyIL0j4knqOZUjMCDsfuSfvrdTeR0755OLdFNWsjrVyuado2QLHlGFZUeP3BQ&hash=a5f28b2756eddb117a8ef25b79a0ed1b7e8f27ad3698c5c7e3475b112ce76d0d'

onMounted(() => {
  console.log(miniApp.initData)
  console.log((window as any).Telegram.WebApp.initData)
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
