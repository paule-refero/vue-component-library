import BaseBadge from '../src/components/BaseBadge.vue';
import { within } from 'storybook/test';

export default {
    title: 'Atoms/BaseBadge',
    component: BaseBadge,
    tags: ['autodocs'],
};

const createSpy = () => {
    const spy = { called: false };
    const fn = () => {
        spy.called = true;
    };
    return { spy, fn };
};

const baseArgs = {
    default: 'I\'m a Badge',
};

// Stories
export const Primary = {
    args: {
        ...baseArgs,
        class: 'px-4 py-1 bg-blue-800 text-white leading-4',
    },
};

export const Secondary = {
    args: {
        ...baseArgs,
        class: 'px-4 py-1 bg-stone-800 text-white leading-4',
    },
};

export const Outline = {
    args: {
        ...baseArgs,
        variant: 'outline',
        class: 'px-4 py-1 border border-gray-600 text-gray-800',
    },
};

export const NotRounded = {
    args: {
        ...baseArgs,
        rounded: false,
        class: 'px-4 py-1 bg-green-800 text-white leading-4',
    },
};

export const Dismissible = (() => {
    const { spy, fn } = createSpy();

    return {
        args: {
            ...baseArgs,
            dismissible: true,
            onDismiss: fn,
            class: 'px-4 py-1 bg-red-800 text-white leading-4',
            _spy: spy,
        },
        play: async ({ canvasElement, args, userEvent }) => {
            const canvas = within(canvasElement);
            const button = canvas.getByRole('button');

            await userEvent.click(button);

            if (!args._spy.called) {
                throw new Error('onDismiss was not called!');
            }
        },
    };
})();
