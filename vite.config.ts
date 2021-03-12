/*
 * @Description:
 * @Author: 尹彬宇
 * @Date: 2021-03-03 18:20:46
 * @LastEditors: 尹彬宇
 * @LastEditTime: 2021-03-10 17:18:33
 * @FilePath: /vite-vue3-ts-template/vite.config.ts
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import styleImport from 'vite-plugin-style-import';
import visualizer from 'rollup-plugin-visualizer';
import styles from 'rollup-plugin-styles';
import path from 'path';


const apiProxy = {
    changeOrigin: true,
    target: 'http://page-daily.kuaidadi.com',
};

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        styleImport({
            // include: 'node_modules',
            libs: [
                {
                    libraryName: 'ant-design-vue',
                    esModule: true,
                    resolveStyle: (name) => `ant-design-vue/es/${name}/style/index`,
                },
            ],
        }),
    ],
    server: {
        hmr: { overlay: false },
        // https: true,
        proxy: {
            // string shorthand
            '/api/hmmis': apiProxy,
        },
    },
    resolve: {
        alias: { '@': path.resolve(__dirname, './src') },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    css: {
        postcss: '',
        preprocessorOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#1db5ad',
                },
                javascriptEnabled: true,
            },
        },
    },
    build: {
        // lib: {
        //     entry: path.resolve(__dirname, 'src/main.tsx'),
        //     formats: ['umd'],
        //     name: 'nsky-weather',
        // },
        rollupOptions: {
            input: 'src/main.ts',
            preserveEntrySignatures: 'allow-extension',
            plugins: [
                visualizer({ open: false }),
                styles({
                    // extract: true,
                    // extensions: ['.css', '.scss', '.less'],
                }),
            ],
            output: {
                format: 'system',
                manualChunks: null,
            },
        },
    },
});
