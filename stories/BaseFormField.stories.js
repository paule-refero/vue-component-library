import BaseFormField from "../src/components/BaseFormField.vue";
import BaseInput from "../src/components/BaseInput.vue";
import { within, expect } from "storybook/test";

export default {
    title: "Components/BaseFormField",
    component: BaseFormField,
    tags: ["autodocs"],
    argTypes: {
        error: { control: 'text' },
    },
};

const baseArgs = {
    forLabel: 'field-id',
    label: 'Field Label',
    error: null,
    labelInfo: null,
    required: false,
};

// Default
export const Default = {
    render: (args) => ({
        components: { BaseFormField, BaseInput },
        setup() {
            return { args };
        },
        template: `
            <BaseFormField v-bind="args">
                <BaseInput
                    :id="args.forLabel"
                    placeholder="Enter text..."
                    modelValue=""
                />
            </BaseFormField>
        `,
    }),
    args: baseArgs,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        expect(canvas.getByText('Field Label')).toBeInTheDocument();
        expect(canvas.getByPlaceholderText('Enter text...')).toBeInTheDocument();
    },
};

// With Required Indicator
export const Required = {
    render: (args) => ({
        components: { BaseFormField, BaseInput },
        setup() {
            return { args };
        },
        template: `
            <BaseFormField v-bind="args">
                <BaseInput
                    :id="args.forLabel"
                    placeholder="Enter required field..."
                    modelValue=""
                />
            </BaseFormField>
        `,
    }),
    args: {
        ...baseArgs,
        label: 'Username',
        required: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        expect(canvas.getByText('Username')).toBeInTheDocument();
        expect(canvas.getByText('*')).toBeInTheDocument();
    },
};

// With Label Info
export const WithLabelInfo = {
    render: (args) => ({
        components: { BaseFormField, BaseInput },
        setup() {
            return { args };
        },
        template: `
            <BaseFormField v-bind="args">
                <BaseInput
                    :id="args.forLabel"
                    placeholder="Enter optional field..."
                    modelValue=""
                />
            </BaseFormField>
        `,
    }),
    args: {
        ...baseArgs,
        label: 'Nickname',
        labelInfo: '(optional)',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        expect(canvas.getByText(/optional/i)).toBeInTheDocument();
    },
};

// With Error
export const WithError = {
    render: (args) => ({
        components: { BaseFormField, BaseInput },
        setup() {
            return { args };
        },
        template: `
            <BaseFormField v-bind="args">
                <BaseInput
                    :id="args.forLabel"
                    :error="true"
                    placeholder="Invalid input..."
                    modelValue=""
                />
            </BaseFormField>
        `,
    }),
    args: {
        ...baseArgs,
        label: 'Email',
        error: 'Please enter a valid email address',
        required: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const errorMsg = canvas.getByText('Please enter a valid email address');
        expect(errorMsg).toBeInTheDocument();
        expect(errorMsg.tagName).toBe('P');
    },
};

// Complete Example
export const CompleteExample = {
    render: (args) => ({
        components: { BaseFormField, BaseInput },
        setup() {
            return { args };
        },
        template: `
            <BaseFormField v-bind="args">
                <BaseInput
                    :id="args.forLabel"
                    placeholder="Enter your password..."
                    type="password"
                    modelValue=""
                />
            </BaseFormField>
        `,
    }),
    args: {
        ...baseArgs,
        forLabel: 'password-field',
        label: 'Password',
        labelInfo: '(minimum 8 characters)',
        required: true,
    },
};

// Multiple Fields Form
export const MultipleFields = {
    render: (args) => ({
        components: { BaseFormField, BaseInput },
        setup() {
            return { args };
        },
        template: `
            <div class="space-y-4">
                <BaseFormField
                    forLabel="first-name"
                    label="First Name"
                    :required="true"
                >
                    <BaseInput
                        id="first-name"
                        placeholder="John"
                        modelValue=""
                    />
                </BaseFormField>

                <BaseFormField
                    forLabel="last-name"
                    label="Last Name"
                    :required="true"
                >
                    <BaseInput
                        id="last-name"
                        placeholder="Doe"
                        modelValue=""
                    />
                </BaseFormField>

                <BaseFormField
                    forLabel="email"
                    label="Email"
                    :required="true"
                    error="Invalid email format"
                >
                    <BaseInput
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        modelValue="invalid-email"
                        :error="true"
                    />
                </BaseFormField>
            </div>
        `,
    }),
    args: {},
};

// With Textarea
export const WithTextarea = {
    render: (args) => ({
        components: { BaseFormField },
        setup() {
            return { args };
        },
        template: `
            <BaseFormField v-bind="args">
                <textarea
                    :id="args.forLabel"
                    placeholder="Enter your message..."
                    class="w-full p-3 border-2 border-stone-500 rounded"
                    rows="4"
                ></textarea>
            </BaseFormField>
        `,
    }),
    args: {
        ...baseArgs,
        label: 'Message',
        labelInfo: '(maximum 500 characters)',
    },
};
