import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseLink from '../src/components/BaseLink.vue';

describe('BaseLink', () => {
    const factory = (props = {}, slots = {}) => {
        return mount(BaseLink, {
            props: {
                to: '/test',
                ...props,
            },
            slots,
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a :to="to" :title="title"><slot /></a>',
                        props: ['to', 'title'],
                    },
                },
            },
        });
    };

    it('renders correctly', () => {
        const wrapper = factory();

        expect(wrapper.find('a').exists()).toBe(true);
    });

    it('accepts string path for to prop', () => {
        const wrapper = factory({
            to: '/about',
        });

        expect(wrapper.vm.to).toBe('/about');
    });

    it('accepts object for to prop', () => {
        const wrapper = factory({
            to: { name: 'Home', params: { id: 1 } },
        });

        expect(wrapper.vm.to).toEqual({ name: 'Home', params: { id: 1 } });
    });

    it('renders slot content', () => {
        const wrapper = factory({}, {
            default: 'Click me',
        });

        expect(wrapper.text()).toBe('Click me');
    });

    it('applies title attribute when provided', () => {
        const wrapper = factory({
            title: 'Go to home page',
        });

        expect(wrapper.vm.title).toBe('Go to home page');
    });

    it('handles empty title', () => {
        const wrapper = factory({
            title: '',
        });

        expect(wrapper.vm.title).toBe('');
    });

    it('has default empty to prop', () => {
        const wrapper = mount(BaseLink, {
            global: {
                stubs: {
                    'router-link': {
                        template: '<a><slot /></a>',
                        props: ['to', 'title'],
                    },
                },
            },
        });

        expect(wrapper.vm.to).toBe('');
    });

    it('has default empty title', () => {
        const wrapper = mount(BaseLink, {
            global: {
                stubs: {
                    'router-link': {
                        template: '<a><slot /></a>',
                        props: ['to', 'title'],
                    },
                },
            },
        });

        expect(wrapper.vm.title).toBe('');
    });

    it('applies text color classes', () => {
        const wrapper = factory();
        const link = wrapper.find('a');

        expect(link.classes()).toContain('text-blue-700');
    });

    it('applies hover classes', () => {
        const wrapper = factory();
        const link = wrapper.find('a');

        expect(link.classes()).toContain('hover:text-blue-800');
        expect(link.classes()).toContain('hover:underline');
    });

    it('applies focus classes', () => {
        const wrapper = factory();
        const link = wrapper.find('a');

        expect(link.classes()).toContain('focus:text-blue-800');
        expect(link.classes()).toContain('focus:underline');
    });

    it('renders complex slot content', () => {
        const wrapper = factory({}, {
            default: '<span class="icon">→</span> Read More',
        });

        expect(wrapper.find('.icon').exists()).toBe(true);
        expect(wrapper.text()).toContain('Read More');
    });
});
