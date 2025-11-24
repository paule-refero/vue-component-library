import BaseInput from "../src/components/BaseInput.vue";
import { within, expect, userEvent } from "storybook/test";
import { ref } from 'vue';

export default {
    title: "Components/BaseInput",
    component: BaseInput,
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'date', 'time', 'datetime-local', 'search'],
        },
        modelValue: { control: 'text' },
    },
};

// Base args
const baseArgs = {
    id: 'input-field',
    placeholder: 'Enter text...',
    modelValue: '',
    disabled: false,
    error: false,
    type: 'text',
};

// Default story
export const Default = {
    args: baseArgs,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', 'Enter text...');
    },
};

// Text Input
export const TextInput = {
    args: {
        ...baseArgs,
        placeholder: 'Enter your name',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');

        await userEvent.type(input, 'John Doe');
        expect(input).toHaveValue('John Doe');
    },
};

// Email Input
export const EmailInput = {
    args: {
        ...baseArgs,
        id: 'email-input',
        type: 'email',
        placeholder: 'Enter your email',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByPlaceholderText('Enter your email');

        expect(input).toHaveAttribute('type', 'email');
        await userEvent.type(input, 'user@example.com');
        expect(input).toHaveValue('user@example.com');
    },
};

// Search Input
export const SearchInput = {
    args: {
        ...baseArgs,
        id: 'search-input',
        type: 'search',
        placeholder: 'Search...',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByPlaceholderText('Search...');

        expect(input).toHaveAttribute('type', 'search');
    },
};

// Date Input
export const DateInput = {
    args: {
        ...baseArgs,
        id: 'date-input',
        type: 'date',
        placeholder: 'Select date',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvasElement.querySelector('input[type="date"]');

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'date');
    },
};

// With Value
export const WithValue = {
    args: {
        ...baseArgs,
        modelValue: 'Pre-filled value',
        placeholder: 'Enter text',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');

        expect(input).toHaveValue('Pre-filled value');
    },
};

// Disabled State
export const Disabled = {
    args: {
        ...baseArgs,
        disabled: true,
        placeholder: 'This field is disabled',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');

        expect(input).toBeDisabled();

        // Try to type - should not work
        await userEvent.type(input, 'Should not work');
        expect(input).toHaveValue('');
    },
};

// Error State
export const WithError = {
    args: {
        ...baseArgs,
        error: true,
        placeholder: 'This field has an error',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');

        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveClass('!text-red-700', '!border-danger');
    },
};

// With v-model (reactive)
export const ReactiveVModel = {
    render: (args) => ({
        components: { BaseInput },
        setup() {
            const value = ref('');
            return { args, value };
        },
        template: `
            <div>
                <BaseInput v-bind="args" v-model="value" />
                <p class="mt-2 text-sm text-secondary-600">Current value: <strong>{{ value || '(empty)' }}</strong></p>
            </div>
        `,
    }),
    args: {
        ...baseArgs,
        placeholder: 'Type to see reactive value',
    },
};

// Numeric Value
export const NumericValue = {
    args: {
        ...baseArgs,
        modelValue: 12345,
        placeholder: 'Numeric input',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');

        expect(input).toHaveValue('12345');
    },
};

// Long Placeholder
export const LongPlaceholder = {
    args: {
        ...baseArgs,
        placeholder: 'This is a very long placeholder text to demonstrate how it looks in the input field',
    },
};

// Accessibility Attributes
export const AccessibilityFeatures = {
    args: {
        ...baseArgs,
        id: 'accessible-input',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');

        expect(input).toHaveAttribute('id', 'accessible-input');
        expect(input).toHaveAttribute('name', 'accessible-input');
        expect(input).toHaveAttribute('aria-describedby', 'accessible-input');
    },
};
