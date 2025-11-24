import BaseButton from '../src/components/BaseButton.vue';
import { userEvent, within } from '@storybook/testing-library';

export default {
    title: 'Components/BaseButton',
    component: BaseButton,
    tags: ['autodocs'],
    argTypes: { processClick: { action: 'clicked' }, },
};

// Browser-safe spy
const createSpy = () => {
    const spy = { called: false };
    const fn = () => { spy.called = true };
    return { spy, fn };
};

// Base args
const baseArgs = {
    disabled: false,
    default: 'Click Me',
};


// Play function for enabled buttons
const testProcessClickEnabled = async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.click(button);

    if (args._spy && !args.disabled) {
        if (!args._spy.called) {
            throw new Error('Callback was not called!');
        }
    }
};

// Stories
export const Primary = (() => {
    const { spy, fn } = createSpy();
    return {
        args: {
            ...baseArgs,
            class: 'px-4 py-1.5 btn-primary',
            callback: fn,
            _spy: spy,
        },
        play: testProcessClickEnabled,
    };
})();

export const Secondary = (() => {
    const { spy, fn } = createSpy();
    return {
        args: {
            ...baseArgs,
            class: 'px-4 py-1.5 btn-secondary',
            callback: fn,
            _spy: spy,
        },
        play: testProcessClickEnabled,
    };
})();

export const Success = (() => {
    const { spy, fn } = createSpy();
    return {
        args: {
            ...baseArgs,
            class: 'px-4 py-1.5 btn-success',
            callback: fn,
            _spy: spy,
        },
        play: testProcessClickEnabled,
    };
})();

export const Warning = (() => {
    const { spy, fn } = createSpy();
    return {
        args: {
            ...baseArgs,
            class: 'px-4 py-1.5 btn-warning',
            callback: fn,
            _spy: spy,
        },
        play: testProcessClickEnabled,
    };
})();

export const Danger = (() => {
    const { spy, fn } = createSpy();
    return {
        args: {
            ...baseArgs,
            class: 'px-4 py-1.5 btn-danger',
            callback: fn,
            _spy: spy,
        },
        play: testProcessClickEnabled,
    };
})();

// Disabled button: callback should NOT be called
export const Disabled = (() => {
    const { spy, fn } = createSpy();
    return {
        args: {
            ...baseArgs,
            class: 'px-4 py-1.5 btn-primary',
            disabled: true,
            callback: fn,
            _spy: spy,
        },
        play: async ({ canvasElement, args }) => {
            const canvas = within(canvasElement);
            const button = canvas.getByRole('button');

            await userEvent.click(button);

            if (args._spy.called) {
                throw new Error('Callback should NOT have been called for disabled button!');
            }
        },
    };
})();

// No callback story: covers undefined callback branch
export const NoCallback = {
    args: {
        ...baseArgs,
        class: 'px-4 py-1.5 btn-primary',
        callback: undefined,
    },
    play: testProcessClickEnabled,
};
