import { defineStore } from "pinia";
import { ref, computed} from 'vue'
import type {User} from '../types'

export const useUserStore = defineStore('user',()=>{

    const user = ref<User>({
        id: Number(localStorage.getItem('id')),
        username:  localStorage.getItem('username') || "",
        email: localStorage.getItem('email') || "",
        role: {
            name: localStorage.getItem('role') || ""
        }
    })

    console.log(user.value.username)

    const username = computed(() => user.value.username)
    const jwt = ref(localStorage.getItem('jwt') || '')
    const authenticated = computed(() => jwt.value !== "")
    const role = computed(() => user.value.role.name)

    function authenticaded(authUser: User, token: string) {
        user.value = authUser
        jwt.value = token
    
        localStorage.setItem('username', authUser.username)
        localStorage.setItem('id', authUser.id.toString())
        localStorage.setItem('email', authUser.email)
        localStorage.setItem('role', authUser.role.name)
        localStorage.setItem('jwt', token)
      }
    
      function logout() {
        jwt.value = ""
        user.value = {} as User
    
        localStorage.clear()
      }
    


    return {user,username,jwt,role,authenticated,authenticaded, logout}
})

