<template>
    <button
        type="button"
        class="btn flex items-center justify-center"
        :disabled="disabled"
        @click="processClick($event)"
    >
        <template v-if="processing">
            <slot name="processing-icon">
                <FontAwesomeIcon
                    icon="fa-solid fa-gear"
                    class="fa-spin absolute"
                />
            </slot>
        </template>
        <span :class="{'opacity-0':processing}">
            <slot />
        </span>
    </button>
</template>

<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const props = defineProps({
    callback: {
        type: Function,
        required: false,
        default: undefined,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    processing: {
        type: Boolean,
        default: false,
    },
});

const processClick = (e) => {
    if (props.callback !== undefined) {
        e.preventDefault();

        return props.callback();
    }
};
</script>
