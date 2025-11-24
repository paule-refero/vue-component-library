import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { resolve } from 'node:path'
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin';

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
    ],
    build: {
        lib: {
            entry: "./src/main.js",
            name: "Vue3ComponentLibrary",
            fileName: format => `vue3-component-library.${format}.js`
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue"
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@components': resolve(__dirname, './src/components'),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        coverage: {
            provider: "v8",
            reporter: ["text", "html"],
            reportsDirectory: "./coverage",
            include: ["src/components/**/*.{js,vue}"],
            exclude: [
                "node_modules/",
                "stories/",
            ],
        },
        projects: [
            {
                extends: true,
                test: {
                    name: "unit",
                    include: ["tests/**/*.test.js"],
                    environment: "jsdom",
                },
            },
            {
                extends: true,
                plugins: [
                    storybookTest({
                        configDir: path.join(__dirname, ".storybook"),
                    }),
                ],
                test: {
                    name: "storybook",
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: "playwright",
                        instances: [
                            { browser: "chromium" },
                        ],
                    },
                    setupFiles: [".storybook/vitest.setup.js"],
                },
            },
        ],
    },
});
