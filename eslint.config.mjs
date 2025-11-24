import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
    {
        files: ["**/*.{js,mjs,cjs,vue}"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                requestAnimationFrame: "readonly",
                cancelAnimationFrame: "readonly",
            },
        },
        ...pluginJs.configs.recommended,
        rules: {
            "no-console": "off",
            "no-debugger": "error",
        },
    },

    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module",
                parser: "@babel/eslint-parser",
                requireConfigFile: false,
                babelOptions: {
                    presets: ["@babel/preset-env"],
                },
            },
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                requestAnimationFrame: "readonly",
                cancelAnimationFrame: "readonly",
            },
        },
        plugins: {
            vue: pluginVue,
        },
        rules: {
            ...pluginVue.configs["flat/recommended"].rules,
        },
    },

    {
        ignores: ["README.md", "package.json", "jsconfig.json", "src/presets/*.json"],
    },
];
