/*
 * @Description: 入口文件
 * @Author: 尹彬宇
 * @Date: 2021-03-03 18:20:46
 * @LastEditors: 尹彬宇
 * @LastEditTime: 2021-03-05 18:09:23
 * @FilePath: /vite-vue3-ts-template/src/main.ts
 */
import { createApp } from 'vue';
import App from '@/App.vue';
import router from './router';
import store from './store';
import '@/theme/index';

const app = createApp(App);
app.use(router).use(store).mount('#app');
