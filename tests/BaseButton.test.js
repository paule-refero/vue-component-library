import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import BaseBtn from '../src/components/BaseButton.vue';

library.add(faGear)

describe('BaseButton', () => {
    const factory = (props = {}, slots = {}) => {
        return mount(BaseBtn, {
            global: {
                stubs: { FontAwesomeIcon },
            },
            props,
            slots,
        })
    }

    it('renders correctly', () => {
        const wrapper = factory()

        expect(wrapper.find('button').exists()).toBe(true)
    });

    it('renders default slot', () => {
        const wrapper = factory(
            {},
            {
                default: 'Click me',
            }
        );
        expect(wrapper.text()).toContain('Click me');
    });

    it('renders processing slot when processing is true', () => {
        const wrapper = factory(
            {
                processing: true,
            },
            {
                'processing-icon': '<span class="custom-processing">Loading...</span>',
            },
    );

        expect(wrapper.find('.custom-processing').exists()).toBe(true);
        expect(wrapper.find('span.opacity-0').exists()).toBe(true);
    });

    it('disables when disabled prop is true', () => {
        const wrapper = factory({ disabled: true })

        expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    });

    it('calls callback function when clicked', async () => {
        const callbackMock = vi.fn()
        const wrapper = factory({ callback: callbackMock })

        await wrapper.find('button').trigger('click')

        expect(callbackMock).toHaveBeenCalled()
    });

    it('prevents default when callback is provided', async () => {
        const callbackMock = vi.fn()
        const preventDefaultMock = vi.fn()
        const wrapper = factory({ callback: callbackMock })

        await wrapper.find('button').trigger('click', { preventDefault: preventDefaultMock })

        expect(preventDefaultMock).toHaveBeenCalled()
    });

    it('does not call callback if callback prop is undefined', async () => {
        const wrapper = factory();

        const mockEvent = { preventDefault: vi.fn() };

        await wrapper.vm.processClick(mockEvent);

        expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });

    it('shows processing icon when processing is true', async () => {
        const wrapper = factory({ processing: true })

        expect(wrapper.find('svg').classes()).toContain('fa-spin')
    });

    it('hides button text when processing is true', () => {
        const wrapper = factory({ processing: true }, { default: 'Click Me' })
        const span = wrapper.find('span')

        expect(span.classes()).toContain('opacity-0')
    });

    it('displays button text normally when processing is false', () => {
        const wrapper = factory({ processing: false }, { default: 'Click Me' })
        const span = wrapper.find('span')

        expect(span.classes()).not.toContain('opacity-0')
    });
});
