import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from '@tailwindcss/vite';
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import { resolve } from 'node:path';

export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    whitespace: 'preserve',
                    onWarn: (warning) => {
                        // Suppress the decodeEntities warning in non-browser builds
                        if (warning.message?.includes('decodeEntities')) {
                            return;
                        }
                        console.warn(warning);
                    },
                }
            }
        }),
        tailwindcss(),
    ],
    build: {
        lib: {
            entry: "./src/main.js",
            name: "Vue3ComponentLibrary",
            fileName: format => `vue3-component-library.${format}.js`
        },
        rollupOptions: {
            external: ["vue", "vue-router"],
            output: {
                globals: {
                    vue: "Vue",
                    "vue-router": "VueRouter"
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
        onConsoleLog(log) {
            // Suppress Vue compiler decodeEntities warnings
            if (log.includes('decodeEntities option is passed but will be ignored in non-browser builds')) {
                return false;
            }
        },
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
