import BaseSelect from "../src/components/BaseSelect.vue";
import { within, expect, userEvent } from "storybook/test";
import { ref } from 'vue';

export default {
    title: "Atoms/BaseSelect",
    component: BaseSelect,
    tags: ["autodocs"],
};

// Note: Due to component's v-for structure, options format is { 'value': 'DisplayText' }
const baseArgs = {
    id: 'select-field',
    options: { 'opt1': 'Option 1', 'opt2': 'Option 2', 'opt3': 'Option 3' },
    modelValue: '',
    placeholder: '',
    disabled: false,
    error: false,
};

// Default
export const Default = {
    args: baseArgs,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const select = canvasElement.querySelector('select');

        expect(select).toBeInTheDocument();
        expect(canvas.getByText('Option 1')).toBeInTheDocument();
    },
};

// With Placeholder
export const WithPlaceholder = {
    args: {
        ...baseArgs,
        placeholder: 'Select an option...',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        expect(canvas.getByText('Select an option...')).toBeInTheDocument();
    },
};

// With Value Selected
export const WithValueSelected = {
    args: {
        ...baseArgs,
        modelValue: 'opt2',
        options: { 'opt1': 'First', 'opt2': 'Second', 'opt3': 'Third' },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const select = canvasElement.querySelector('select');

        expect(select.value).toBe('opt2');
        const selectedOption = canvas.getByText('Second');
        expect(selectedOption).toBeInTheDocument();
    },
};

// User Selection
export const UserSelection = {
    args: {
        ...baseArgs,
        placeholder: 'Choose a fruit',
        options: { 'apple': 'Apple', 'banana': 'Banana', 'orange': 'Orange' },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const select = canvasElement.querySelector('select');

        await userEvent.selectOptions(select, 'banana');
        expect(select.value).toBe('banana');
        expect(canvas.getByText('Banana').selected).toBe(true);
    },
};

// Disabled State
export const Disabled = {
    args: {
        ...baseArgs,
        disabled: true,
        placeholder: 'This select is disabled',
    },
    play: async ({ canvasElement }) => {
        const select = canvasElement.querySelector('select');

        expect(select).toBeDisabled();
        expect(select).toHaveClass('opacity-50', 'cursor-not-allowed');
    },
};

// Error State
export const WithError = {
    args: {
        ...baseArgs,
        error: true,
        placeholder: 'Selection required',
    },
    play: async ({ canvasElement }) => {
        const select = canvasElement.querySelector('select');

        expect(select).toHaveClass('!text-red-700', '!border-red-600');
    },
};

// Country Selector
export const CountrySelector = {
    args: {
        id: 'country',
        placeholder: 'Select your country',
        modelValue: '',
        options: {
            'us': 'United States',
            'uk': 'United Kingdom',
            'ca': 'Canada',
            'au': 'Australia',
            'de': 'Germany',
            'fr': 'France',
        },
    },
};

// Numeric Options
export const NumericOptions = {
    args: {
        id: 'quantity',
        placeholder: 'Select quantity',
        modelValue: null,
        options: {
            '1': '1 item',
            '5': '5 items',
            '10': '10 items',
            '25': '25 items',
            '50': '50 items',
        },
    },
};

// Boolean Options
export const BooleanOptions = {
    args: {
        id: 'active',
        placeholder: 'Select status',
        modelValue: null,
        options: {
            'true': 'Active',
            'false': 'Inactive',
        },
    },
};

// Reactive v-model
export const ReactiveVModel = {
    render: (args) => ({
        components: { BaseSelect },
        setup() {
            const selected = ref('');
            return { args, selected };
        },
        template: `
            <div>
                <BaseSelect v-bind="args" v-model="selected" />
                <p class="mt-2 text-sm text-gray-600">
                    Selected value: <strong>{{ selected || '(none)' }}</strong>
                </p>
            </div>
        `,
    }),
    args: {
        ...baseArgs,
        placeholder: 'Make a selection',
        options: {
            'sm': 'Small',
            'md': 'Medium',
            'lg': 'Large',
            'xl': 'Extra Large',
        },
    },
};

// Form Example
export const InFormContext = {
    render: () => ({
        components: { BaseSelect },
        setup() {
            const formData = ref({
                priority: '',
                category: '',
                status: '',
            });
            return { formData };
        },
        template: `
            <div class="space-y-4 p-4 bg-gray-50 rounded">
                <div>
                    <label for="priority" class="block mb-2 font-medium">Priority</label>
                    <BaseSelect
                        id="priority"
                        v-model="formData.priority"
                        placeholder="Select priority"
                        :options="{ 'low': 'Low', 'medium': 'Medium', 'high': 'High', 'critical': 'Critical' }"
                    />
                </div>
                <div>
                    <label for="category" class="block mb-2 font-medium">Category</label>
                    <BaseSelect
                        id="category"
                        v-model="formData.category"
                        placeholder="Select category"
                        :options="{ 'bug': 'Bug', 'feature': 'Feature', 'enhancement': 'Enhancement' }"
                    />
                </div>
                <div>
                    <label for="status" class="block mb-2 font-medium">Status</label>
                    <BaseSelect
                        id="status"
                        v-model="formData.status"
                        placeholder="Select status"
                        :options="{ 'open': 'Open', 'in-progress': 'In Progress', 'closed': 'Closed' }"
                    />
                </div>
                <div class="text-xs text-gray-600 p-2 bg-white rounded">
                    <strong>Form Data:</strong> {{ formData }}
                </div>
            </div>
        `,
    }),
};
