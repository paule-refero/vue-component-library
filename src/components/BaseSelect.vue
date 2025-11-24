<template>
    <select
        :id="id"
        :value="modelValue"
        :aria-disabled="disabled ? 'true' : 'false'"
        :aria-label="'Dropdown Menu'"
        :class="[disabled ? 'opacity-50 cursor-not-allowed' : error ? '!text-red-700 !border-red-600' : null ]"
        :disabled="disabled"
        class="w-full p-2 border-2 border-stone-500 rounded bg-white text-stone-900 focus:ring-3 focus:ring-yellow-600 focus:outline-none"
        @input="$emit('update:modelValue', $event.target.value)"
    >
        <option
            v-if="placeholder"
            value=""
            disabled
            selected
        >
            {{ placeholder }}
        </option>
        <option
            v-for="(key, value, index) in options"
            :key="index"
            :value="value"
        >
            {{ key }}
        </option>
    </select>
</template>

<script setup>
defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    id: {
        type: String,
        required: true,
    },
    modelValue: {
        default: null,
        required: false,
        type: [String, Number, Boolean, null],
    },
    error: {
        type: Boolean,
        default: false,
    },
    options: {
        type: Object,
        required: true,
    },
    placeholder: {
        type: String,
        default: '',
    },
});

defineEmits(['update:modelValue']);
</script>
