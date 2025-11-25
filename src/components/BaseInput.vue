<template>
    <input
        :id="id"
        :aria-describedby="id"
        :aria-invalid="error"
        :aria-label="id"
        :autocomplete="type === 'password' ? 'off' : 'on'"
        :disabled="disabled"
        :name="id"
        :placeholder="placeholder"
        :type="type"
        :value="modelValue"
        class="w-full px-3 py-2.5 border-2 border-stone-500 leading-6 rounded bg-white text-stone-900 focus:ring-3 focus:ring-yellow-600 focus:outline-none"
        :class="{
            '!text-red-700 !border-red-600':error,
            'opacity-70': disabled,
        }"
        @input="$emit('update:modelValue', $event.target.value)"
    >
</template>

<script setup>
defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    error: {
        type: Boolean,
        default: false,
    },
    id: {
        type: String,
        required: true,
    },
    modelValue: {
        type: [String, Number, null],
        default: null,
    },
    placeholder: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
        validator(value) {
            return ['text', 'email', 'password', 'date', 'time', 'datetime-local', 'search'].includes(value);
        },
    },
});

defineEmits(['update:modelValue']);
</script>
