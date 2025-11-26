/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
    stories: [
        "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    ],
    addons: [
        "@chromatic-com/storybook",
        "@storybook/addon-docs",
        "@storybook/addon-a11y",
        "@storybook/addon-vitest",
    ],
    framework: {
        name: "@storybook/vue3-vite",
        options: {},
    },
    viteFinal: async (config) => {
        // Find the Vue plugin in the config and update its options
        const vuePlugin = config.plugins?.find(plugin => plugin?.name === 'vite:vue');
        if (vuePlugin) {
            // Suppress the decodeEntities warning in non-browser builds
            vuePlugin.options = {
                ...vuePlugin.options,
                template: {
                    ...vuePlugin.options?.template,
                    compilerOptions: {
                        ...vuePlugin.options?.template?.compilerOptions,
                        onWarn: (warning) => {
                            // Suppress the decodeEntities warning
                            if (warning.message?.includes('decodeEntities')) {
                                return;
                            }
                            console.warn(warning);
                        },
                    },
                },
            };
        }

        return {
            ...config,
            optimizeDeps: {
                ...(config.optimizeDeps ?? {}),
                include: [
                    ...(config.optimizeDeps?.include ?? []),
                    "vue",
                    "vue-router",
                ],
            },
        };
    },
};

export default config;
