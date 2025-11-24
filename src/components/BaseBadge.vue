<template>
    <div
        :class="[
            'inline-flex items-center px-2 py-0.5 text-xs font-medium',
            rounded ? 'rounded-full' : 'rounded',
            badgeVariant
        ]"
    >
        <span class="whitespace-nowrap">
            <slot />
        </span>

        <BaseButton
            v-if="dismissible"
            class="isolate inline-block rounded-full transition ml-3"
            title="Dismiss"
            @click="doDismiss"
        >
            <slot name="dismissible">
                <span class="sr-only">Remove</span>
                <FontAwesomeIcon
                    :icon="'fa-xmark'"
                    :size="'xs'"
                />
            </slot>
        </BaseButton>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import BaseButton from "@components/BaseButton.vue";

const props = defineProps({
    variant: {
        type: String,
        default: 'solid',
    },
    rounded: {
        type: Boolean,
        default: true,
    },
    dismissible: {
        type: Boolean,
        default: false,
    },
    onDismiss: {
        type: Function,
        default: null,
    },
});

const emit = defineEmits(['dismissed']);

const badgeVariant = computed(() => {
    return props.variant === 'outline' ? 'bg-transparent' : '';
});

const doDismiss = () => {
    props.onDismiss?.();
    emit('dismissed');
};
</script>
