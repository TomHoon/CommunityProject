import { createWebHistory, createRouter } from 'vue-router';

import DefaultLayout from "@/components/DefaultLayout";
import Admin from '@/components/admin/Admin'
import AdminLogin from '@/components/admin/AdminLogin'

const routes = [
  {
    path: "/",
    component: DefaultLayout
  },
  {
    path: '/admin',
    component: Admin
  },
  {
   path: '/adminLogin',
   component: AdminLogin
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;