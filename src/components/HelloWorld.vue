<!--
 * @Description: 
 * @Author: 尹彬宇
 * @Date: 2021-03-03 18:20:46
 * @LastEditors: 尹彬宇
 * @LastEditTime: 2021-03-05 15:33:32
 * @FilePath: /vite-vue3-ts-template/src/components/HelloWorld.vue
-->
<template>
    <h1>{{ msg }}</h1>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: 'HelloWorld',
    props: {
        msg: {
            type: String,
            required: true,
        },
    }
});
</script>

<style scoped>
</style>
