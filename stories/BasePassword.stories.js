import { ref } from 'vue';
import { within, expect, userEvent } from "storybook/test";
import BasePasswordField from "../src/components/BasePasswordField.vue";

export default {
    title: "Components/BasePasswordField",
    component: BasePasswordField,
    tags: ["autodocs"],
    argTypes: {
        modelValue: { control: 'text' },
    },
};

// Base args
const baseArgs = {
    id: 'password-field',
    placeholder: 'Enter password...',
    modelValue: '',
    error: false,
};

// Default story
export const Default = {
    args: {
        ...baseArgs,
        id: 'default-password',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvasElement.querySelector('input[type="password"]');
        const button = canvas.getByRole('button');

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'password');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('title', 'Toggle Password Reveal');
    },
};

// With Password Reveal
export const PasswordReveal = {
    args: {
        ...baseArgs,
        id: 'show-password',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvasElement.querySelector('input');
        const button = canvas.getByRole('button');

        // Initially password type
        expect(input).toHaveAttribute('type', 'password');

        // Click to reveal
        await userEvent.click(button);
        expect(input).toHaveAttribute('type', 'text');

        // Click to hide again
        await userEvent.click(button);
        expect(input).toHaveAttribute('type', 'password');
    },
};

// With Value
export const WithValue = {
    args: {
        ...baseArgs,
        id: 'with-value-field',
        modelValue: 'secretPassword123',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvasElement.querySelector('input');

        expect(input).toHaveValue('secretPassword123');
    },
};

// User Typing
export const UserTyping = {
    args: {
        ...baseArgs,
        id: 'user-input-field',
        placeholder: 'Create a strong password',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvasElement.querySelector('input');

        await userEvent.type(input, 'MyS3cur3P@ssw0rd');
        expect(input).toHaveValue('MyS3cur3P@ssw0rd');
    },
};

// Error State
export const WithError = {
    args: {
        ...baseArgs,
        id: 'with-error-field',
        error: true,
        placeholder: 'Password is required',
        modelValue: '',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvasElement.querySelector('input');

        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveClass('!text-red-700', '!border-danger');
    },
};

// Reveal Password with Value
export const RevealWithValue = {
    args: {
        ...baseArgs,
        id: 'with-reveal-field',
        modelValue: 'HiddenPassword',
        placeholder: 'Your password',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvasElement.querySelector('input');
        const button = canvas.getByRole('button');

        // Password is hidden
        expect(input).toHaveAttribute('type', 'password');
        expect(input).toHaveValue('HiddenPassword');

        // Reveal password
        await userEvent.click(button);
        expect(input).toHaveAttribute('type', 'text');
        expect(input).toHaveValue('HiddenPassword');
    },
};

// With v-model (reactive)
export const ReactiveVModel = {
    render: (args) => ({
        components: { BasePasswordField },
        setup() {
            const password = ref('');
            return { args, password };
        },
        template: `
            <div>
                <BasePasswordField v-bind="args" v-model="password" />
                <p class="mt-2 text-sm text-secondary-600">
                    Password length: <strong>{{ password.length }}</strong> characters
                </p>
                <p class="text-xs text-secondary-500 mt-1">
                    {{ password ? 'Password: ' + password : 'No password entered' }}
                </p>
            </div>
        `,
    }),
    args: {
        ...baseArgs,
        id: 'reactive-field',
        placeholder: 'Type to see reactive updates',
    },
};

// Multiple Toggles
export const MultipleToggles = {
    args: {
        ...baseArgs,
        id: 'multiple-toggles-field',
        modelValue: 'test123',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvasElement.querySelector('input');
        const button = canvas.getByRole('button');

        // Toggle multiple times
        expect(input).toHaveAttribute('type', 'password');

        await userEvent.click(button);
        expect(input).toHaveAttribute('type', 'text');

        await userEvent.click(button);
        expect(input).toHaveAttribute('type', 'password');

        await userEvent.click(button);
        expect(input).toHaveAttribute('type', 'text');
    },
};

// Accessibility Features
export const AccessibilityFeatures = {
    args: {
        ...baseArgs,
        id: 'secure-password',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvasElement.querySelector('input');
        const button = canvas.getByRole('button');

        expect(input).toHaveAttribute('id', 'secure-password');
        expect(input).toHaveAttribute('aria-describedby', 'secure-password');
        expect(button).toHaveAttribute('data-qa', 'password-reveal-button');
        expect(button).toHaveAttribute('type', 'button');
    },
};

// Long Password
export const LongPassword = {
    args: {
        ...baseArgs,
        id: 'long-password-field',
        modelValue: 'ThisIsAVeryLongPasswordWithManyCharacters1234567890!@#$%^&*()',
        placeholder: 'Long password example',
    },
};

// Empty to Filled
export const EmptyToFilled = {
    args: {
        ...baseArgs,
        id: 'empty-field',
        placeholder: 'Enter your password',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvasElement.querySelector('input');

        expect(input).toHaveValue('');

        await userEvent.type(input, 'NewPassword123!');
        expect(input).toHaveValue('NewPassword123!');
    },
};

// Combined with Error State
export const ErrorAndReveal = {
    args: {
        ...baseArgs,
        id: 'error-field',
        error: true,
        modelValue: 'weak',
        placeholder: 'Password too short',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvasElement.querySelector('input');
        const button = canvas.getByRole('button');

        // Has error styling
        expect(input).toHaveClass('!text-red-700', '!border-danger');

        // Can still toggle visibility
        await userEvent.click(button);
        expect(input).toHaveAttribute('type', 'text');
        expect(input).toHaveValue('weak');
    },
};
