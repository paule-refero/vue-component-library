<template>
    <RouterLink
        :to="to"
        :title="title"
        exact-path
        class="text-blue-700 hover:text-blue-800 focus:text-blue-800 hover:underline focus:underline cursor-pointer"
    >
        <slot />
    </RouterLink>
</template>

<script setup>
import RouterLink from 'vue-router';
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
