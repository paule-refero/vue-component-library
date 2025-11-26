import BaseCard from '../src/components/BaseCard.vue';
import { within } from 'storybook/test';

export default {
    title: 'Atoms/BaseCard',
    component: BaseCard,
    tags: ['autodocs'],
};

const baseArgs = {
    default: 'This is the main card content.',
};

// Default card
export const Default = {
    args: {
        ...baseArgs,
        class: 'bg-white text-stone-800 shadow-md rounded-lg p-4',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Should render default text
        canvas.getByText(/main card content/i);

        // Header/footer should NOT exist
        const header = canvas.queryByText(/Card Header/i);
        const footer = canvas.queryByText(/Card Footer/i);

        if (header) {
            throw new Error('Header slot should not be rendered in Default story');
        }

        if (footer) {
            throw new Error('Footer slot should not be rendered in Default story');
        }
    },
};

// Card with header slot
export const WithHeader = {
    render: (args) => ({
        components: { BaseCard },
        setup() {
            return { args };
        },
        template: `
      <BaseCard v-bind='args'>
        <template #header>
          <div class='bg-gray-200 px-4 py-2 font-bold text-stone-800 w-full'>Card Header</div>
        </template>
        {{ args.default }}
      </BaseCard>
    `,
    }),
    args: {
        ...baseArgs,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        canvas.getByText(/Card Header/i);
        canvas.getByText(/main card content/i);

        const footer = canvas.queryByText(/Card Footer/i);

        if (footer) {
            throw new Error('Footer slot should not be rendered in WithHeader story');
        }
    },
};

// Card with footer slot
export const WithFooter = {
    render: (args) => ({
        components: { BaseCard },
        setup() {
            return { args };
        },
        template: `
      <BaseCard v-bind='args'>
        {{ args.default }}
        <template #footer>
          <div class='bg-gray-200 px-4 py-2 text-stone-800 text-sm w-full'>Card Footer</div>
        </template>
      </BaseCard>
    `,
    }),
    args: {
        ...baseArgs,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        canvas.getByText(/Card Footer/i);
        canvas.getByText(/main card content/i);

        const header = canvas.queryByText(/Card Header/i);

        if (header) {
            throw new Error('Header slot should not be rendered in WithFooter story');
        }
    },
};

// Card with both header and footer slots
export const WithHeaderAndFooter = {
    render: (args) => ({
        components: { BaseCard },
        setup() {
            return { args };
        },
        template: `
      <BaseCard v-bind='args'>
        <template #header>
          <div class='bg-gray-200 px-4 py-2 font-bold text-stone-800 w-full'>Card Header</div>
        </template>
        {{ args.default }}
        <template #footer>
          <div class='bg-gray-200 px-4 py-2 text-stone-800 text-sm w-full'>Card Footer</div>
        </template>
      </BaseCard>
    `,
    }),
    args: {
        ...baseArgs,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        canvas.getByText(/Card Header/i);
        canvas.getByText(/Card Footer/i);
        canvas.getByText(/main card content/i);
    },
};
