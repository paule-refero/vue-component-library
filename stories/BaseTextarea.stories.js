import BaseTextarea from "../src/components/BaseTextarea.vue";
import { within, expect, userEvent } from "storybook/test";
import { ref } from 'vue';

export default {
    title: "Components/BaseTextarea",
    component: BaseTextarea,
    tags: ["autodocs"],
};

const baseArgs = {
    id: 'textarea-field',
    placeholder: 'Enter text...',
    modelValue: '',
    disabled: false,
    error: false,
};

// Default
export const Default = {
    args: baseArgs,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const textarea = canvasElement.querySelector('textarea');

        expect(textarea).toBeInTheDocument();
        expect(textarea).toHaveAttribute('placeholder', 'Enter text...');
    },
};

// With Value
export const WithValue = {
    args: {
        ...baseArgs,
        modelValue: 'This is pre-filled text content in the textarea.',
    },
    play: async ({ canvasElement }) => {
        const textarea = canvasElement.querySelector('textarea');

        expect(textarea.value).toBe('This is pre-filled text content in the textarea.');
    },
};

// User Typing
export const UserTyping = {
    args: {
        ...baseArgs,
        placeholder: 'Type your message here...',
    },
    play: async ({ canvasElement }) => {
        const textarea = canvasElement.querySelector('textarea');

        await userEvent.type(textarea, 'Hello, this is a test message!');
        expect(textarea.value).toContain('Hello, this is a test message!');
    },
};

// Multiline Content
export const MultilineContent = {
    args: {
        ...baseArgs,
        modelValue: 'Line 1: Introduction\nLine 2: Main content\nLine 3: Conclusion',
    },
};

// Disabled State
export const Disabled = {
    args: {
        ...baseArgs,
        disabled: true,
        placeholder: 'This textarea is disabled',
        modelValue: 'Cannot edit this content',
    },
    play: async ({ canvasElement }) => {
        const textarea = canvasElement.querySelector('textarea');

        expect(textarea).toBeDisabled();
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
        const textarea = canvasElement.querySelector('textarea');

        expect(textarea).toHaveAttribute('aria-invalid', 'true');
        expect(textarea).toHaveClass('!text-red-700', '!border-red-600');
    },
};

// Long Text
export const LongText = {
    args: {
        ...baseArgs,
        modelValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
};

// Reactive v-model
export const ReactiveVModel = {
    render: (args) => ({
        components: { BaseTextarea },
        setup() {
            const message = ref('');
            return { args, message };
        },
        template: `
            <div>
                <BaseTextarea v-bind="args" v-model="message" />
                <div class="mt-2 text-sm text-gray-600">
                    <strong>Character count:</strong> {{ message.length }}
                    <span v-if="message.length > 0" class="ml-4">
                        <strong>Word count:</strong> {{ message.trim().split(/\\s+/).length }}
                    </span>
                </div>
                <p class="mt-2 text-xs text-gray-500">Preview:</p>
                <div class="p-2 bg-gray-50 rounded text-sm">
                    {{ message || '(empty)' }}
                </div>
            </div>
        `,
    }),
    args: {
        ...baseArgs,
        placeholder: 'Start typing to see character count...',
    },
};

// Comment Box
export const CommentBox = {
    render: () => ({
        components: { BaseTextarea },
        setup() {
            const comment = ref('');
            const maxChars = 500;
            const remaining = ref(maxChars);

            const updateRemaining = (value) => {
                comment.value = value;
                remaining.value = maxChars - value.length;
            };

            return { comment, remaining, maxChars, updateRemaining };
        },
        template: `
            <div class="max-w-2xl">
                <label for="comment" class="text-stone-600 block mb-2 font-medium">Leave a comment</label>
                <BaseTextarea
                    id="comment"
                    placeholder="Share your thoughts..."
                    :modelValue="comment"
                    @update:modelValue="updateRemaining"
                />
                <div class="flex justify-between items-center mt-2 text-xs">
                    <span :class="remaining < 50 ? 'text-red-600' : 'text-gray-600'">
                        {{ remaining }} / {{ maxChars }} characters remaining
                    </span>
                    <button class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Post Comment
                    </button>
                </div>
            </div>
        `,
    }),
};

// Feedback Form
export const FeedbackForm = {
    render: () => ({
        components: { BaseTextarea },
        setup() {
            const feedback = ref('');
            return { feedback };
        },
        template: `
            <div class="max-w-lg p-4 bg-white rounded shadow">
                <h3 class="text-stone-700 text-lg font-semibold mb-4">Send Feedback</h3>
                <div class="space-y-4">
                    <div>
                        <label for="feedback" class="text-stone-600 block mb-2 font-medium">Your Feedback</label>
                        <BaseTextarea
                            id="feedback"
                            v-model="feedback"
                            placeholder="Tell us what you think..."
                        />
                    </div>
                    <div class="flex gap-2">
                        <button class="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800">
                            Submit
                        </button>
                        <button class="px-4 py-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-700">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        `,
    }),
};

// Code Editor Style
export const CodeEditorStyle = {
    render: () => ({
        components: { BaseTextarea },
        setup() {
            const code = ref('function hello() {\n  console.log("Hello, World!");\n}');
            return { code };
        },
        template: `
            <div class="max-w-2xl">
                <label for="code" class="text-stone-600 block mb-2 font-medium font-mono">Code Editor</label>
                <BaseTextarea
                    id="code"
                    v-model="code"
                    placeholder="Enter your code..."
                    class="font-mono text-sm"
                />
            </div>
        `,
    }),
};

// Accessibility Features
export const AccessibilityFeatures = {
    args: {
        ...baseArgs,
        id: 'accessible-textarea',
        placeholder: 'This textarea has proper ARIA attributes',
    },
    play: async ({ canvasElement }) => {
        const textarea = canvasElement.querySelector('textarea');

        expect(textarea).toHaveAttribute('id', 'accessible-textarea');
        expect(textarea).toHaveAttribute('name', 'accessible-textarea');
        expect(textarea).toHaveAttribute('aria-describedby', 'accessible-textarea');
    },
};
