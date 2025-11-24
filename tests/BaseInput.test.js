import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInput from '../src/components/BaseInput.vue';

describe('BaseInput', () => {
    const factory = (props = {}) => {
        return mount(BaseInput, {
            props: {
                id: 'test-input',
                placeholder: 'Enter text',
                ...props,
            },
        });
    };

    it('renders correctly', () => {
        const wrapper = factory();

        expect(wrapper.find('input').exists()).toBe(true);
    });

    it('renders with required props', () => {
        const wrapper = factory({
            id: 'email-input',
            placeholder: 'Enter your email',
        });

        const input = wrapper.find('input');
        expect(input.attributes('id')).toBe('email-input');
        expect(input.attributes('placeholder')).toBe('Enter your email');
    });

    it('binds modelValue correctly', () => {
        const wrapper = factory({
            modelValue: 'test value',
        });

        expect(wrapper.find('input').element.value).toBe('test value');
    });

    it('emits update:modelValue when input changes', async () => {
        const wrapper = factory();
        const input = wrapper.find('input');

        await input.setValue('new value');

        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new value']);
    });

    it('applies disabled attribute when disabled prop is true', () => {
        const wrapper = factory({ disabled: true });

        expect(wrapper.find('input').attributes('disabled')).toBeDefined();
    });

    it('applies disabled styling when disabled', () => {
        const wrapper = factory({ disabled: true });

        expect(wrapper.find('input').classes()).toContain('opacity-70');
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
        const wrapper = factory({ id: 'test-id' });

        expect(wrapper.find('input').attributes('aria-describedby')).toBe('test-id');
    });

    it('sets name attribute to match id', () => {
        const wrapper = factory({ id: 'test-id' });

        expect(wrapper.find('input').attributes('name')).toBe('test-id');
    });

    it('renders with different input types', () => {
        const types = ['text', 'email', 'password', 'date', 'time', 'datetime-local', 'search'];

        types.forEach(type => {
            const wrapper = factory({ type });
            expect(wrapper.find('input').attributes('type')).toBe(type);
        });
    });

    it('defaults to text type', () => {
        const wrapper = factory();

        expect(wrapper.find('input').attributes('type')).toBe('text');
    });

    it('sets autocomplete to off for password type', () => {
        const wrapper = factory({ type: 'password' });

        expect(wrapper.find('input').attributes('autocomplete')).toBe('off');
    });

    it('sets autocomplete to on for non-password types', () => {
        const wrapper = factory({ type: 'email' });

        expect(wrapper.find('input').attributes('autocomplete')).toBe('on');
    });

    it('handles null modelValue', () => {
        const wrapper = factory({ modelValue: null });

        expect(wrapper.find('input').element.value).toBe('');
    });

    it('handles numeric modelValue', () => {
        const wrapper = factory({ modelValue: 123 });

        expect(wrapper.find('input').element.value).toBe('123');
    });

    it('applies all base CSS classes', () => {
        const wrapper = factory();
        const input = wrapper.find('input');

        expect(input.classes()).toContain('w-full');
        expect(input.classes()).toContain('px-3');
        expect(input.classes()).toContain('py-2.5');
        expect(input.classes()).toContain('border-2');
        expect(input.classes()).toContain('rounded');
    });

    it('does not apply error styling when error is false', () => {
        const wrapper = factory({ error: false });
        const input = wrapper.find('input');

        expect(input.classes()).not.toContain('!text-red-700');
        expect(input.classes()).not.toContain('!border-danger');
    });

    it('does not apply disabled styling when not disabled', () => {
        const wrapper = factory({ disabled: false });

        expect(wrapper.find('input').classes()).not.toContain('opacity-70');
    });
});
