import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSelect from '../src/components/BaseSelect.vue';

describe('BaseSelect', () => {
    const factory = (props = {}) => {
        return mount(BaseSelect, {
            props: {
                id: 'test-select',
                // Note: The component's v-for uses (key, value) where key is the iteration value
                // So options format is: { 'optionValue': 'Display Text' }
                options: { 'value1': 'Option1', 'value2': 'Option2' },
                ...props,
            },
        });
    };

    it('renders correctly', () => {
        const wrapper = factory();

        expect(wrapper.find('select').exists()).toBe(true);
    });

    it('renders options from options prop', () => {
        const wrapper = factory({
            options: { 'first': 'First Option', 'second': 'Second Option' },
        });

        const options = wrapper.findAll('option');
        expect(options.length).toBeGreaterThanOrEqual(2);
        const texts = options.map(opt => opt.text());
        expect(texts).toContain('First Option');
        expect(texts).toContain('Second Option');
    });

    it('sets correct option values', () => {
        const wrapper = factory({
            options: { 'value123': 'Display Text' },
        });

        const option = wrapper.findAll('option').find(opt => opt.text() === 'Display Text');
        expect(option.attributes('value')).toBe('value123');
    });

    it('binds modelValue correctly', () => {
        const wrapper = factory({
            options: { 'value1': 'Option 1', 'value2': 'Option 2' },
            modelValue: 'value1',
        });

        expect(wrapper.find('select').element.value).toBe('value1');
    });

    it('emits update:modelValue when selection changes', async () => {
        const wrapper = factory({
            options: { 'opt1': 'Option 1', 'opt2': 'Option 2' },
        });

        await wrapper.find('select').setValue('opt2');

        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['opt2']);
    });

    it('renders placeholder option when placeholder prop is provided', () => {
        const wrapper = factory({
            placeholder: 'Select an option',
        });

        const placeholderOption = wrapper.find('option[value=""]');
        expect(placeholderOption.exists()).toBe(true);
        expect(placeholderOption.text()).toBe('Select an option');
    });

    it('placeholder option is disabled', () => {
        const wrapper = factory({
            placeholder: 'Choose one',
        });

        const placeholderOption = wrapper.find('option[value=""]');
        expect(placeholderOption.attributes('disabled')).toBeDefined();
    });

    it('placeholder option is selected', () => {
        const wrapper = factory({
            placeholder: 'Choose one',
        });

        const placeholderOption = wrapper.find('option[value=""]');
        expect(placeholderOption.attributes('selected')).toBeDefined();
    });

    it('applies disabled attribute when disabled prop is true', () => {
        const wrapper = factory({
            disabled: true,
        });

        expect(wrapper.find('select').attributes('disabled')).toBeDefined();
    });

    it('sets aria-disabled when disabled', () => {
        const wrapper = factory({
            disabled: true,
        });

        expect(wrapper.find('select').attributes('aria-disabled')).toBe('true');
    });

    it('sets aria-disabled to false when not disabled', () => {
        const wrapper = factory({
            disabled: false,
        });

        expect(wrapper.find('select').attributes('aria-disabled')).toBe('false');
    });

    it('applies disabled styling when disabled', () => {
        const wrapper = factory({
            disabled: true,
        });

        expect(wrapper.find('select').classes()).toContain('opacity-50');
        expect(wrapper.find('select').classes()).toContain('cursor-not-allowed');
    });

    it('applies error styling when error prop is true', () => {
        const wrapper = factory({
            error: true,
        });

        expect(wrapper.find('select').classes()).toContain('!text-red-700');
        expect(wrapper.find('select').classes()).toContain('!border-red-600');
    });

    it('does not apply error styling when error is false', () => {
        const wrapper = factory({
            error: false,
        });

        expect(wrapper.find('select').classes()).not.toContain('!text-red-700');
        expect(wrapper.find('select').classes()).not.toContain('!border-red-600');
    });

    it('sets id attribute', () => {
        const wrapper = factory({
            id: 'country-select',
        });

        expect(wrapper.find('select').attributes('id')).toBe('country-select');
    });

    it('has aria-label attribute', () => {
        const wrapper = factory();

        expect(wrapper.find('select').attributes('aria-label')).toBe('Dropdown Menu');
    });

    it('applies base CSS classes', () => {
        const wrapper = factory();
        const select = wrapper.find('select');

        expect(select.classes()).toContain('w-full');
        expect(select.classes()).toContain('p-2');
        expect(select.classes()).toContain('border-2');
        expect(select.classes()).toContain('rounded');
    });

    it('handles null modelValue', () => {
        const wrapper = factory({
            modelValue: null,
        });

        expect(wrapper.find('select').element.value).toBe('');
    });

    it('handles numeric modelValue', () => {
        const wrapper = factory({
            options: { '123': 'Number Option' },
            modelValue: 123,
        });

        expect(wrapper.find('select').element.value).toBe('123');
    });

    it('handles boolean modelValue', () => {
        const wrapper = factory({
            options: { 'true': 'Yes', 'false': 'No' },
            modelValue: true,
        });

        expect(wrapper.find('select').element.value).toBe('true');
    });

    it('renders multiple options correctly', () => {
        const wrapper = factory({
            options: {
                'red': 'Red',
                'green': 'Green',
                'blue': 'Blue',
                'yellow': 'Yellow',
            },
        });

        const options = wrapper.findAll('option').filter(opt => opt.attributes('value') !== '');
        expect(options.length).toBe(4);
    });

    it('does not render placeholder when not provided', () => {
        const wrapper = factory({
            placeholder: '',
        });

        const placeholderOption = wrapper.find('option[value=""]');
        expect(placeholderOption.exists()).toBe(false);
    });
});
