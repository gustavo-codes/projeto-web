<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Tracker from '../components/Tracker.vue'
import Profile from '../components/Profile.vue'
import { axios } from '../api'


const nome = ref('')
const email = ref('')
const senha = ref('')
const bio = ref('')
const error = ref<Error>()

const router = useRouter()

async function cadastrar() {
  try{
    console.log("Registrando..")
    const { data } = await axios.post('/users/', {
            "username": nome.value,
            "email": email.value,
            "password":senha.value,
            "confirmed": true,
            "bio": bio.value,
            "role" : "1"
        })
    router.push('/login')
    router.go(1)
  }catch(e){
    error.value = e as Error
  }
}

</script>

<template>
<main>
  <div class="login">
     <h1>{{ error }}</h1>
			<img src="../../public/login_logo.jpg" width=70px alt="logo" class="logo">
			<form @submit.prevent="cadastrar">
				<!--E-mail-->
				<label for="email">E-mail</label>
				<input type="text" id="email" name="email" required v-model="email"><br><br>
				<!--User name-->
				<label for="email">User name:</label>
				<input type="text" id="userName" name="userName" required v-model="nome"><br><br>
				<!--senha-->
				<label for="senha">Senha:</label>
				<input type="password" id="senha" name="senha" required  v-model="senha"><br><br>
				<!--re-senha-->
				<label for="bio">Biografia</label>
				<input type="text" id="bio" name="bio" required v-model="bio"><br><br>
				<!--enviar-->
				<input type="submit" value="Registrar">
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
	margin-left: -30px;
	justify-content:center;
}

.login input
{
	padding:2px;
}
</style>
