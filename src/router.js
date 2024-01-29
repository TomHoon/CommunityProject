import { createWebHistory, createRouter } from 'vue-router';

import DefaultLayout from "@/components/DefaultLayout";
import Admin from '@/components/admin/Admin'
import AdminLogin from '@/components/admin/AdminLogin'
import NotFound from '@/components/admin/NotFound'

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
  },
  {
    path: '/NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;