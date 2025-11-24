<template>
    <transition
        name="slide"
        enter-active-class="transition-all duration-400 ease-in-out"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-[500px]"
        leave-active-class="transition-all duration-400 ease-in-out"
        leave-from-class="opacity-100 max-h-[500px]"
        leave-to-class="opacity-0 max-h-0"
        appear
    >
        <slot />
    </transition>
</template>

<script setup>
</script>
