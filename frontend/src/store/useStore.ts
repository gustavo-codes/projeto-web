import { defineStore } from "pinia";
import { ref} from 'vue'

export const useUserStore = defineStore('user',()=>{
    const username = ref('')
    const jwt = ref('')

    return {username,jwt}
})

