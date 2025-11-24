<template>
    <router-link
        :to="to"
        :title="title"
        exact-path
        class="text-blue-700 dark:text-gray-100 hover:text-blue-800 dark:hover:text-gray-300 focus:text-blue-800 dark:focus:text-gray-400 hover:underline focus:underline"
    >
        <slot />
    </router-link>
</template>

<script setup>
defineProps({
    to: {
        type: [String, Object],
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
});
</script>
