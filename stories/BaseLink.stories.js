import BaseLink from "../src/components/BaseLink.vue";
import { within, expect } from "storybook/test";

export default {
    title: "Atoms/BaseLink",
    component: BaseLink,
    tags: ["autodocs"],
};

const baseArgs = {
    to: '/example',
    title: '',
};

// Default
export const Default = {
    args: {
        ...baseArgs,
        to: '/home',
        default: 'Go to Home',
    },
    render: (args) => ({
        components: { BaseLink },
        setup() {
            return { args };
        },
        template: '<BaseLink :to="args.to" :title="args.title">{{ args.default }}</BaseLink>',
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const link = canvas.getByText('Go to Home');

        expect(link).toBeInTheDocument();
        // Note: router-link isn't resolved in Storybook, so we just check for presence
    },
};

// With Title
export const WithTitle = {
    args: {
        ...baseArgs,
        to: '/about',
        title: 'Learn more about us',
        default: 'About Us',
    },
    render: (args) => ({
        components: { BaseLink },
        setup() {
            return { args };
        },
        template: '<BaseLink :to="args.to" :title="args.title">{{ args.default }}</BaseLink>',
    }),
};

// Object Route
export const ObjectRoute = {
    args: {
        to: { name: 'UserProfile', params: { id: 123 } },
        title: 'View user profile',
        default: 'View Profile',
    },
    render: (args) => ({
        components: { BaseLink },
        setup() {
            return { args };
        },
        template: '<BaseLink :to="args.to" :title="args.title">{{ args.default }}</BaseLink>',
    }),
};

// External Looking Link
export const ExternalStyleLink = {
    args: {
        ...baseArgs,
        to: '/external',
        default: 'External Resource →',
    },
    render: (args) => ({
        components: { BaseLink },
        setup() {
            return { args };
        },
        template: '<BaseLink :to="args.to">{{ args.default }}</BaseLink>',
    }),
};

// Navigation Menu
export const NavigationMenu = {
    render: () => ({
        components: { BaseLink },
        template: `
            <nav class="flex gap-4 p-4 bg-gray-100">
                <BaseLink to="/" title="Go to homepage">Home</BaseLink>
                <BaseLink to="/products" title="Browse products">Products</BaseLink>
                <BaseLink to="/about" title="Learn about us">About</BaseLink>
                <BaseLink to="/contact" title="Get in touch">Contact</BaseLink>
            </nav>
        `,
    }),
};

// In Paragraph
export const InParagraph = {
    render: () => ({
        components: { BaseLink },
        template: `
            <p class="text-gray-700">
                Welcome to our website! Please read our
                <BaseLink to="/terms" title="Terms and conditions">terms and conditions</BaseLink>
                and
                <BaseLink to="/privacy" title="Privacy policy">privacy policy</BaseLink>
                before continuing.
            </p>
        `,
    }),
};

// Breadcrumb Style
export const BreadcrumbStyle = {
    render: () => ({
        components: { BaseLink },
        template: `
            <div class="flex items-center gap-2 text-sm">
                <BaseLink to="/">Home</BaseLink>
                <span>/</span>
                <BaseLink to="/products">Products</BaseLink>
                <span>/</span>
                <BaseLink to="/products/electronics">Electronics</BaseLink>
                <span>/</span>
                <span class="text-gray-500">Laptop</span>
            </div>
        `,
    }),
};

// With Icon
export const WithIcon = {
    render: () => ({
        components: { BaseLink },
        template: `
            <BaseLink to="/download" title="Download file">
                <span class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                    </svg>
                    Download
                </span>
            </BaseLink>
        `,
    }),
};
