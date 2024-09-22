import { createRouter, createWebHistory } from 'vue-router';
import HomePublic from '../pages/HomePublic.vue';
import CommunityPublic from '../pages/CommunityPublic.vue';
import LoginForm from '../pages/LoginForm.vue';
import RegisterForm from '../pages/RegisterForm.vue';
import ProfilePublic from '../pages/ProfilePublic.vue';
import HomeAdmin from '../pages/HomeAdmin.vue';
import { useUserStore } from '../store/useStore';
import CommunityCard from '../components/CommunityCard.vue';
import CommunitySingle from '../pages/CommunitySingle.vue';
import CommunityAdm from '../pages/admin/CommunityAdm.vue';
import CommunityForm from '../pages/admin/CommunityForm.vue';



const routes = [
    {path:'/', name:'home',component:HomePublic},
    {path:'/community', name:'community',component:CommunityPublic},
    {path:'/community/adm', name:'communityadm',component:CommunityAdm,
      meta:{
        requiresAuth:true
      }
    },
    {path:'/community/create', name:'communitycreate',component:CommunityForm,
      meta:{
        requiresAuth:true
      }
    },
    {path:'/community/:id',component:CommunitySingle},
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
    if(to.meta.requiresAuth && !useStore.authenticated){
      return '/login'
    }
    if(useStore.jwt && (to.name == 'login' || to.name == 'register')){
      return '/profile'
    }
  })

export default router;