import { createRouter, createWebHistory } from 'vue-router';
import HomePublic from '../pages/HomePublic.vue';
import ComunityPublic from '../pages/ComunityPublic.vue';
import LoginForm from '../pages/LoginForm.vue';
import RegisterForm from '../pages/RegisterForm.vue';
import ProfilePublic from '../pages/ProfilePublic.vue';
import HomeAdmin from '../pages/HomeAdmin.vue';
import { useUserStore } from '../store/useStore';



const routes = [
    {path:'/', name:'home',component:HomePublic},
    {path:'/comunity', name:'comunity',component:ComunityPublic},
    {path:'/login', name:'login',component:LoginForm},
    {path:'/register', name:'register',component:RegisterForm},
    {path:'/profile',name: 'profile',component:ProfilePublic},
    {path:'/admin',component:HomeAdmin,
      meta:{
        requiresAuth:true
      }
    }
]

export const router = createRouter({  
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
  const useStore = useUserStore()
    if (
      // make sure the user is authenticated
      !useStore.jwt &&
      // ❗️ Avoid an infinite redirect
      to.name == 'profile'
    ) {
      return '/login'
    }
    if(useStore.jwt && (to.name == 'login' || to.name == 'register')){
      return '/profile'
    }
  })

export default router;