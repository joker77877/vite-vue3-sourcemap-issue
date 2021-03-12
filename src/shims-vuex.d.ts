/*
 * @Description:
 * @Author: 尹彬宇
 * @Date: 2021-03-04 11:45:31
 * @LastEditors: 尹彬宇
 * @LastEditTime: 2021-03-04 11:45:32
 * @FilePath: /vite-vue3-ts-template/src/vuex.d.ts
 */
import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        count: number;
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
