import { createWebHistory, createRouter } from 'vue-router';

import DefaultLayout from "@/components/DefaultLayout";
import Admin from '@/components/admin/Admin'

const routes = [
  {
    path: "/",
    component: DefaultLayout
  },
  {
    path: '/admin',
    component: Admin
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;