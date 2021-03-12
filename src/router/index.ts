/*
 * @Description: 路由文件
 * @Author: 尹彬宇
 * @Date: 2021-03-03 18:39:32
 * @LastEditors: 尹彬宇
 * @LastEditTime: 2021-03-12 16:18:17
 * @FilePath: /vite-vue3-ts-template2/src/router/index.ts
 */

// import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Hellow from '@/views/Hellow/index.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'hellow',
        component: Hellow,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
