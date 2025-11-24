<template>
    <div class="flex flex-col w-full mb-3 md:mb-4">
        <label
            class="block mb-2 font-sans dark:text-secondary-200 text-sm md:text-base"
            :class="error ? 'text-red-600' : 'text-secondary-900'"
            :for="forLabel"
        >
            {{ label }}
            <span v-if="required">*</span>
            <span
                v-if="labelInfo !== null"
                class="text-sm italic"
            >{{ labelInfo }}</span>
        </label>
        <slot />
        <p
            v-if="error"
            class="block mt-2 text-red-600 text-xs"
        >
            {{ error }}
        </p>
    </div>
</template>

<script setup>
defineProps({
    forLabel: {
        type: String,
        required: true,
    },
    error: {
        type: String,
        default: null,
    },
    label: {
        type: String,
        default: null,
    },
    labelInfo: {
        type: String,
        default: null,
    },
    required: {
        type: Boolean,
        default: false,
    },
});
</script>
