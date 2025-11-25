import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseTextarea from '../src/components/BaseTextarea.vue';

describe('BaseTextarea', () => {
    const factory = (props = {}) => {
        return mount(BaseTextarea, {
            props: {
                id: 'test-textarea',
                placeholder: 'Enter text...',
                ...props,
            },
        });
    };

    it('renders correctly', () => {
        const wrapper = factory();

        expect(wrapper.find('textarea').exists()).toBe(true);
    });

    it('sets id attribute', () => {
        const wrapper = factory({
            id: 'comment-textarea',
        });

        expect(wrapper.find('textarea').attributes('id')).toBe('comment-textarea');
    });

    it('sets placeholder attribute', () => {
        const wrapper = factory({
            placeholder: 'Type your message',
        });

        expect(wrapper.find('textarea').attributes('placeholder')).toBe('Type your message');
    });

    it('binds modelValue correctly', () => {
        const wrapper = factory({
            modelValue: 'Initial text',
        });

        expect(wrapper.find('textarea').element.value).toBe('Initial text');
    });

    it('emits update:modelValue when text changes', async () => {
        const wrapper = factory();
        const textarea = wrapper.find('textarea');

        await textarea.setValue('New text content');

        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['New text content']);
    });

    it('applies disabled attribute when disabled prop is true', () => {
        const wrapper = factory({
            disabled: true,
        });

        expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    });

    it('does not apply disabled attribute when disabled is false', () => {
        const wrapper = factory({
            disabled: false,
        });

        expect(wrapper.find('textarea').attributes('disabled')).toBeUndefined();
    });

    it('applies error styling when error prop is true', () => {
        const wrapper = factory({
            error: true,
        });

        expect(wrapper.find('textarea').classes()).toContain('!text-red-700');
        expect(wrapper.find('textarea').classes()).toContain('!border-red-600');
    });

    it('does not apply error styling when error is false', () => {
        const wrapper = factory({
            error: false,
        });

        expect(wrapper.find('textarea').classes()).not.toContain('!text-red-700');
        expect(wrapper.find('textarea').classes()).not.toContain('!border-danger');
    });

    it('sets aria-invalid when error is true', () => {
        const wrapper = factory({
            error: true,
        });

        expect(wrapper.find('textarea').attributes('aria-invalid')).toBe('true');
    });

    it('sets aria-invalid to false when error is false', () => {
        const wrapper = factory({
            error: false,
        });

        expect(wrapper.find('textarea').attributes('aria-invalid')).toBe('false');
    });

    it('sets aria-describedby to match id', () => {
        const wrapper = factory({
            id: 'description-field',
        });

        expect(wrapper.find('textarea').attributes('aria-describedby')).toBe('description-field');
    });

    it('sets name attribute to match id', () => {
        const wrapper = factory({
            id: 'feedback-field',
        });

        expect(wrapper.find('textarea').attributes('name')).toBe('feedback-field');
    });

    it('handles null modelValue', () => {
        const wrapper = factory({
            modelValue: null,
        });

        expect(wrapper.find('textarea').element.value).toBe('');
    });

    it('applies all base CSS classes', () => {
        const wrapper = factory();
        const textarea = wrapper.find('textarea');

        expect(textarea.classes()).toContain('w-full');
        expect(textarea.classes()).toContain('p-3');
        expect(textarea.classes()).toContain('border-2');
        expect(textarea.classes()).toContain('rounded');
    });

    it('applies focus styles', () => {
        const wrapper = factory();
        const textarea = wrapper.find('textarea');

        expect(textarea.classes()).toContain('focus:ring-3');
        expect(textarea.classes()).toContain('focus:ring-yellow-600');
        expect(textarea.classes()).toContain('focus:outline-none');
    });

    it('handles multiline text', async () => {
        const wrapper = factory();
        const textarea = wrapper.find('textarea');

        const multilineText = 'Line 1\nLine 2\nLine 3';
        await textarea.setValue(multilineText);

        expect(wrapper.emitted('update:modelValue')[0]).toEqual([multilineText]);
    });

    it('handles empty string modelValue', () => {
        const wrapper = factory({
            modelValue: '',
        });

        expect(wrapper.find('textarea').element.value).toBe('');
    });

    it('handles long text content', () => {
        const longText = 'A'.repeat(1000);
        const wrapper = factory({
            modelValue: longText,
        });

        expect(wrapper.find('textarea').element.value).toBe(longText);
    });

    it('updates when modelValue prop changes', async () => {
        const wrapper = factory({
            modelValue: 'Original text',
        });

        expect(wrapper.find('textarea').element.value).toBe('Original text');

        await wrapper.setProps({ modelValue: 'Updated text' });

        expect(wrapper.find('textarea').element.value).toBe('Updated text');
    });

    it('applies border color classes', () => {
        const wrapper = factory();
        const textarea = wrapper.find('textarea');

        expect(textarea.classes()).toContain('border-stone-500');
    });

    it('applies background and text color classes', () => {
        const wrapper = factory();
        const textarea = wrapper.find('textarea');

        expect(textarea.classes()).toContain('bg-white');
        expect(textarea.classes()).toContain('text-stone-900');
    });
});
