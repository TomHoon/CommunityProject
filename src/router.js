import { createWebHistory, createRouter } from 'vue-router';

import DefaultLayout from "@/components/DefaultLayout";

const routes = [
    {
        pate: "/",
        component: DefaultLayout
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;