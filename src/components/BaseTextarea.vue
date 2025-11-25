<template>
    <textarea
        :id="id"
        :aria-describedby="id"
        :aria-invalid="error"
        :aria-label="id"
        :class="{'!text-red-700 !border-red-600':error}"
        :disabled="disabled"
        :name="id"
        :placeholder="placeholder"
        :value="modelValue"
        class="w-full p-3 border-2 border-stone-500 rounded bg-white text-stone-900 focus:ring-3 focus:ring-yellow-600 focus:outline-none"
        @input="$emit('update:modelValue', $event.target.value)"
    />
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
        type: [String, null],
        default: null,
    },
    placeholder: {
        type: String,
        required: true,
    },
});

defineEmits(['update:modelValue']);
</script>
