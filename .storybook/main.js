/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
    stories: [
        "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    ],
    addons: [
        "@chromatic-com/storybook",
        "@storybook/addon-docs",
        "@storybook/addon-onboarding",
        "@storybook/addon-a11y",
        "@storybook/addon-vitest",
    ],
    framework: {
        name: "@storybook/vue3-vite",
        options: {},
    },
    viteFinal: async (config) => {
        return {
            ...config,
            optimizeDeps: {
                ...(config.optimizeDeps ?? {}),
                include: [
                    ...(config.optimizeDeps?.include ?? []),
                    "vue",
                ],
            },
        };
    },
};

export default config;
