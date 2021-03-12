/*
 * @Author: your name
 * @Date: 2021-01-08 19:03:59
 * @LastEditTime: 2021-03-09 12:22:59
 * @LastEditors: 尹彬宇
 * @Description: In User Settings Edit
 * @FilePath: /vite-vue3-ts-template/.eslintrc.js
 */
module.exports = {
    parser: 'vue-eslint-parser',
    extends: [
        'plugin:vue/vue3-strongly-recommended',
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
        'prettier',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.vue'],
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    // plugins: ['vue', 'prettier'],
    rules: {
        // 自己写一些想配置的规则

        indent: ['error', 4],
        // 'import/extensions': ['off'],
        'import/extensions': [
            'error',
            {
                ignorePackages: true,
                pattern: {
                    js: 'never',
                    jsx: 'never',
                    ts: 'never',
                    tsx: 'never',
                    scss: 'never',
                    vue: 'always',
                },
            },
        ],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/no-unresolved': [
            2,
            {
                ignore: ['^@/'], // @ 是设置的路径别名
            },
        ],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'never',
                    normal: 'always',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
        'vue/attribute-hyphenation': ['error', 'never'],
        '@typescript-eslint/no-floating-promises': [
            'error',
            {
                ignoreVoid: true,
                ignoreIIFE: false,
            },
        ],
        "no-void": ["error", { "allowAsStatement": true }]
    },
    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.scss'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            alias: {
                map: [['/@', './src']],
                extensions: ['.ts', '.js', '.jsx', '.json', '.scss'],
            },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
};
