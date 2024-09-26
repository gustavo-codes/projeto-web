<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { axios } from '../api'
import {useUserStore} from '../store/useStore'
import type {User} from '../types'

const ident = ref('')
const pass = ref('')
const loading = ref(false)
const error = ref<Error>()

const router = useRouter()
const userStore = useUserStore()

async function autenticate() {
    try{
        loading.value = true
        error.value = undefined
        
        const { data } = await axios.post('/auth/local/', {
            identifier: ident.value,
            password: pass.value
        })

        const {jwt} = data
        
        const res = await axios.get('/users/me', {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            params: {
                populate: 'role'
            }
        })
        const user:User ={
            id:res.data.id,
            email:res.data.email,
            username:res.data.username,
            role:{
                name : res.data.role.name
            }
        } 
        console.log(user)
        userStore.authenticaded(user, jwt)   

        if(userStore.role == 'admin'){
            router.push('/community/adm')
        }else{
            router.push('/profile')
        }
        
        router.go(1)

    }catch(e){
        console.error(e)
        error.value = e as Error
    }finally{
        loading.value = true
    }
}

</script>




<template>
    <main>
        <div class="login">
            <h1>{{ error }}</h1>
            <img src="../../public/login_logo.jpg" width=70px alt="logo" class="logo">
            <form @submit.prevent="autenticate">
                <!--user name-->
                <label for="userName">User name:</label>
                <input type="text" id="userName" name="userName" required  v-model="ident"><br><br>
                <!--senha-->
                <label for="senha">Senha:</label>
                <input type="password" id="senha" name="senha" required  v-model="pass"><br><br>
                <!--enviar-->
                <input type="submit" value="entrar">
            </form>
        </div>
    </main>
</template>

<style scoped>
main
{
	display:flex;
	background-color:#6366f1;
	justify-content: center;
	align-items: center;
	height:90vh;
     width: 100vw;
}

.login
{
	display:flex;
	justify-content: center;
	align-items: center;
	flex-direction:column;
	width:200px;
	height:200px;
}

.logo
{
	margin-bottom:10px;
	margin-left: -32px;
	justify-content:center;
}

.login input
{
	padding:2px;
}
</style>
