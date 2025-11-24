<template>
    <div class="relative flex flex-row items-center">
        <input
            v-bind="$attrs"
            :id="id"
            :aria-describedby="id"
            :aria-invalid="error"
            :placeholder="placeholder"
            :value="modelValue"
            :type="revealPassword ? 'text' : 'password'"
            class="w-full px-3 py-2.5 border-2 border-stone-500 leading-6 rounded bg-white text-stone-900 focus:ring-3 focus:ring-yellow-600 focus:outline-none"
            :class="{'!text-red-700 !border-danger':error}"
            @input="$emit('update:modelValue', $event.target.value)"
        >
        <button
            class="absolute right-4.5 cursor-pointer text-stone-600 text-center w-5"
            data-qa="password-reveal-button"
            title="Toggle Password Reveal"
            type="button"
            @click="toggleReveal"
        >
            <FontAwesomeIcon :icon="revealPassword ? 'fa-eye' : 'fa-eye-slash'" />
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineOptions({
    inheritAttrs: false,
});

defineProps({
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
    error: {
        type: Boolean,
        default: false,
    },
});

const revealPassword = ref(false);

const toggleReveal = () => {
    revealPassword.value = !revealPassword.value;
};

defineEmits(['update:modelValue']);
</script>
