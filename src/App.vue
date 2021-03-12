<!--
 * @Description:
 * @Author: 尹彬宇
 * @Date: 2021-03-03 18:20:46
 * @LastEditors: 尹彬宇
 * @LastEditTime: 2021-03-08 18:28:38
 * @FilePath: /vite-vue3-ts-template/src/App.vue
-->
<template>
    <ConfigProvider :locale="locale">
        <router-view />
    </ConfigProvider>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'moment/dist/locale/zh-cn';

export default defineComponent({
    name: 'App',
    components: { ConfigProvider },
    setup: () => {
        const locale = ref(zhCN);
        return { locale };
    },
});
</script>

<style>
#app {
}
</style>
