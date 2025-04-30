import {defineStore} from "pinia";
import type {IUser} from "@/types/interfaces.ts";
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(null)

  return { user }
})
