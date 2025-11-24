<template>
    <router-link
        :to="to"
        :title="title"
        exact-path
        class="text-blue-700 dark:text-stone-100 hover:text-blue-800 dark:hover:text-stone-300 focus:text-blue-800 dark:focus:text-stone-400 hover:underline focus:underline"
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
