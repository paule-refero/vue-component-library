import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseFormField from '../src/components/BaseFormField.vue';

describe('BaseFormField', () => {
    const factory = (props = {}, slots = {}) => {
        return mount(BaseFormField, {
            props: {
                forLabel: 'test-field',
                label: 'Test Label',
                ...props,
            },
            slots,
        });
    };

    it('renders correctly', () => {
        const wrapper = factory();

        expect(wrapper.find('label').exists()).toBe(true);
        expect(wrapper.find('div').classes()).toContain('flex');
    });

    it('renders label text', () => {
        const wrapper = factory({
            label: 'Username',
        });

        expect(wrapper.find('label').text()).toContain('Username');
    });

    it('sets for attribute on label', () => {
        const wrapper = factory({
            forLabel: 'username-field',
        });

        expect(wrapper.find('label').attributes('for')).toBe('username-field');
    });

    it('shows required asterisk when required is true', () => {
        const wrapper = factory({
            required: true,
        });

        expect(wrapper.text()).toContain('*');
    });

    it('does not show asterisk when required is false', () => {
        const wrapper = factory({
            required: false,
        });

        expect(wrapper.text()).not.toContain('*');
    });

    it('displays label info when provided', () => {
        const wrapper = factory({
            labelInfo: '(optional)',
        });

        expect(wrapper.text()).toContain('(optional)');
    });

    it('does not display label info when null', () => {
        const wrapper = factory({
            labelInfo: null,
        });

        const labelInfo = wrapper.findAll('span').filter(span =>
            span.classes().includes('italic')
        );
        expect(labelInfo.length).toBe(0);
    });

    it('displays error message when error prop is provided', () => {
        const wrapper = factory({
            error: 'This field is required',
        });

        const errorMsg = wrapper.find('p.text-red-600');
        expect(errorMsg.exists()).toBe(true);
        expect(errorMsg.text()).toBe('This field is required');
    });

    it('does not display error message when error is null', () => {
        const wrapper = factory({
            error: null,
        });

        expect(wrapper.find('p.text-red-600').exists()).toBe(false);
    });

    it('applies error styling to label when error exists', () => {
        const wrapper = factory({
            error: 'Error message',
        });

        expect(wrapper.find('label').classes()).toContain('text-red-600');
    });

    it('applies normal styling to label when no error', () => {
        const wrapper = factory({
            error: null,
        });

        expect(wrapper.find('label').classes()).toContain('text-stone-900');
        expect(wrapper.find('label').classes()).not.toContain('text-red-600');
    });

    it('renders slot content', () => {
        const wrapper = factory({}, {
            default: '<input type="text" id="test" />',
        });

        expect(wrapper.find('input').exists()).toBe(true);
    });

    it('wraps content in proper structure', () => {
        const wrapper = factory();

        const container = wrapper.find('div');
        expect(container.classes()).toContain('flex');
        expect(container.classes()).toContain('flex-col');
        expect(container.classes()).toContain('w-full');
        expect(container.classes()).toContain('mb-3');
    });

    it('displays all elements in correct order', () => {
        const wrapper = factory(
            {
                label: 'Email',
                labelInfo: '(required)',
                required: true,
                error: 'Invalid email',
            },
            {
                default: '<input type="email" />',
            }
        );

        const html = wrapper.html();
        const labelIndex = html.indexOf('Email');
        const asteriskIndex = html.indexOf('*');
        const infoIndex = html.indexOf('(required)');
        const inputIndex = html.indexOf('<input');
        const errorIndex = html.indexOf('Invalid email');

        expect(labelIndex).toBeLessThan(asteriskIndex);
        expect(asteriskIndex).toBeLessThan(infoIndex);
        expect(infoIndex).toBeLessThan(inputIndex);
        expect(inputIndex).toBeLessThan(errorIndex);
    });

    it('applies responsive margin classes', () => {
        const wrapper = factory();

        const container = wrapper.find('div');
        expect(container.classes()).toContain('mb-3');
        expect(container.classes()).toContain('md:mb-4');
    });

    it('applies responsive text size to label', () => {
        const wrapper = factory();

        const label = wrapper.find('label');
        expect(label.classes()).toContain('text-sm');
    });

    it('handles empty label', () => {
        const wrapper = factory({
            label: '',
        });

        expect(wrapper.find('label').text().trim()).toBe('');
    });
});
