import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import BasePasswordField from '../src/components/BasePasswordField.vue';

library.add(faEye, faEyeSlash);

describe('BasePasswordField', () => {
    const factory = (props = {}) => {
        return mount(BasePasswordField, {
            global: {
                components: { FontAwesomeIcon },
            },
            props: {
                id: 'test-password',
                placeholder: 'Enter password',
                ...props,
            },
        });
    };

    it('renders correctly', () => {
        const wrapper = factory();

        expect(wrapper.find('input').exists()).toBe(true);
        expect(wrapper.find('button[data-qa="password-reveal-button"]').exists()).toBe(true);
    });

    it('renders with required props', () => {
        const wrapper = factory({
            id: 'password-input',
            placeholder: 'Enter your password',
        });

        const input = wrapper.find('input');
        expect(input.attributes('id')).toBe('password-input');
        expect(input.attributes('placeholder')).toBe('Enter your password');
    });

    it('starts with password type by default', () => {
        const wrapper = factory();

        expect(wrapper.find('input').attributes('type')).toBe('password');
    });

    it('binds modelValue correctly', () => {
        const wrapper = factory({
            modelValue: 'secret123',
        });

        expect(wrapper.find('input').element.value).toBe('secret123');
    });

    it('emits update:modelValue when input changes', async () => {
        const wrapper = factory();
        const input = wrapper.find('input');

        await input.setValue('newpassword');

        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['newpassword']);
    });

    it('toggles password visibility when button is clicked', async () => {
        const wrapper = factory();
        const input = wrapper.find('input');
        const button = wrapper.find('button[data-qa="password-reveal-button"]');

        expect(input.attributes('type')).toBe('password');

        await button.trigger('click');
        expect(input.attributes('type')).toBe('text');

        await button.trigger('click');
        expect(input.attributes('type')).toBe('password');
    });

    it('changes icon when password is revealed', async () => {
        const wrapper = factory();
        const button = wrapper.find('button[data-qa="password-reveal-button"]');

        // Initially shows eye-slash icon (password hidden)
        let icon = button.findComponent(FontAwesomeIcon);
        expect(icon.props('icon')).toBe('fa-eye-slash');

        // Click to reveal password
        await button.trigger('click');
        icon = button.findComponent(FontAwesomeIcon);
        expect(icon.props('icon')).toBe('fa-eye');

        // Click to hide password again
        await button.trigger('click');
        icon = button.findComponent(FontAwesomeIcon);
        expect(icon.props('icon')).toBe('fa-eye-slash');
    });

    it('applies error styling when error prop is true', () => {
        const wrapper = factory({ error: true });
        const input = wrapper.find('input');

        expect(input.classes()).toContain('!text-red-700');
        expect(input.classes()).toContain('!border-danger');
    });

    it('sets aria-invalid when error is true', () => {
        const wrapper = factory({ error: true });

        expect(wrapper.find('input').attributes('aria-invalid')).toBe('true');
    });

    it('sets aria-describedby to match id', () => {
        const wrapper = factory({ id: 'pwd-id' });

        expect(wrapper.find('input').attributes('aria-describedby')).toBe('pwd-id');
    });

    it('has button with correct title attribute', () => {
        const wrapper = factory();
        const button = wrapper.find('button[data-qa="password-reveal-button"]');

        expect(button.attributes('title')).toBe('Toggle Password Reveal');
    });

    it('has button with type="button" to prevent form submission', () => {
        const wrapper = factory();
        const button = wrapper.find('button[data-qa="password-reveal-button"]');

        expect(button.attributes('type')).toBe('button');
    });

    it('handles null modelValue', () => {
        const wrapper = factory({ modelValue: null });

        expect(wrapper.find('input').element.value).toBe('');
    });

    it('applies all base CSS classes to input', () => {
        const wrapper = factory();
        const input = wrapper.find('input');

        expect(input.classes()).toContain('w-full');
        expect(input.classes()).toContain('px-3');
        expect(input.classes()).toContain('py-2.5');
        expect(input.classes()).toContain('border-2');
        expect(input.classes()).toContain('rounded');
    });

    it('wraps input in relative container', () => {
        const wrapper = factory();
        const container = wrapper.find('div');

        expect(container.classes()).toContain('relative');
        expect(container.classes()).toContain('flex');
        expect(container.classes()).toContain('flex-row');
    });

    it('positions button absolutely', () => {
        const wrapper = factory();
        const button = wrapper.find('button[data-qa="password-reveal-button"]');

        expect(button.classes()).toContain('absolute');
        expect(button.classes()).toContain('right-4.5');
    });

    it('does not apply error styling when error is false', () => {
        const wrapper = factory({ error: false });
        const input = wrapper.find('input');

        expect(input.classes()).not.toContain('!text-red-700');
        expect(input.classes()).not.toContain('!border-danger');
    });

    it('passes through additional attributes with v-bind', async () => {
        const wrapper = mount(BasePasswordField, {
            global: {
                components: { FontAwesomeIcon },
            },
            props: {
                id: 'test-password',
                placeholder: 'Enter password',
            },
            attrs: {
                'data-testid': 'custom-test',
                autocomplete: 'new-password',
            },
        });

        const input = wrapper.find('input');
        expect(input.attributes('data-testid')).toBe('custom-test');
        expect(input.attributes('autocomplete')).toBe('new-password');
    });

    it('maintains reveal state across multiple toggles', async () => {
        const wrapper = factory();
        const button = wrapper.find('button[data-qa="password-reveal-button"]');
        const input = wrapper.find('input');

        // Toggle multiple times
        for (let i = 0; i < 5; i++) {
            await button.trigger('click');
            expect(input.attributes('type')).toBe(i % 2 === 0 ? 'text' : 'password');
        }
    });
});
