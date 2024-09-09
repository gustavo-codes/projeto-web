import { createRouter, createWebHistory } from 'vue-router';
import HomePublic from '../pages/HomePublic.vue';
import ComunityPublic from '../pages/ComunityPublic.vue';
import LoginForm from '../pages/LoginForm.vue';
import RegisterForm from '../pages/RegisterForm.vue';
import ProfilePublic from '../pages/ProfilePublic.vue';

const routes = [
    {path:'/', component:HomePublic},
    {path:'/comunity', component:ComunityPublic},
    {path:'/login', component:LoginForm},
    {path:'/register', component:RegisterForm},
    {path:'/profile',name: 'profile',component:ProfilePublic}
]

export const router = createRouter({  
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
    if (
      // make sure the user is authenticated
      !sessionStorage.getItem('jwt') &&
      // ❗️ Avoid an infinite redirect
      to.name == 'profile'
    ) {
      return '/login'
    }
  })

export default router;