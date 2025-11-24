<template>
    <div class="flex flex-col border border-stone-300 shadow rounded-lg overflow-hidden">
        <div
            v-if="hasHeaderSlot"
            class="flex shrink"
        >
            <slot name="header" />
        </div>

        <slot />

        <div
            v-if="hasFooterSlot"
            class="flex shrink"
        >
            <slot name="footer" />
        </div>
    </div>
</template>

<script setup>
import { useSlots } from 'vue';

const slots = useSlots();
const hasHeaderSlot = !!slots['header'];
const hasFooterSlot = !!slots['footer'];
</script>
