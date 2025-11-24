<template>
    <div
        ref="dropdownItemHolder"
        v-click-outside="outsideClickCloser"
        class="relative dropdown-holder inline-block overflow-visible"
    >
        <slot
            name="dropdownTrigger"
            :toggle="toggleDropdown"
            :is-open="dropdownOpen"
        >
            <button
                type="button"
                class="btn !block w-full items-center space-x-1.5 rounded text-nowrap"
                :class="finalOptions.triggerStyles"
                :data-qa="qaDataLabel"
                @click.prevent="toggleDropdown"
            >
                <span
                    v-if="triggerText"
                    class="inline"
                >{{ triggerText }}</span>
                <FontAwesomeIcon
                    :icon="triggerIcon"
                    class="inline-block fa-sm"
                />
            </button>
        </slot>
        <SlideDownUp v-bind="finalOptions.transitionProps">
            <div
                v-if="dropdownOpen"
                class="dropdown-items ring-1 ring-secondary-200 absolute right-0 p-2 rounded shadow-md z-[1] w-48 min-w-full"
                :class="[finalOptions.dropdownStyles]"
            >
                <slot
                    :toggle="toggleDropdown"
                    :click-close="clickOutsideHandler"
                    :is-open="dropdownOpen"
                />
            </div>
        </SlideDownUp>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { vClickOutside } from '@/utils/clickOutside';
import SlideDownUp from '@/transitions/SlideDownUp.vue';

const props = defineProps({
    externalState: {
        type: Boolean,
        default: false,
    },
    onCloseCallback: {
        type: Function,
        default: null,
    },
    triggerText: {
        type: String,
        default: null,
    },
    triggerIcon: {
        type: String,
        default: 'a-solid fa-angle-down',
    },
    triggerSize: {
        type: String,
        default: null,
    },
    dropdownOptions: {
        type: Object,
        default: () => ({}),
    },
    qaDataLabel: {
        type: String,
        default: null,
    },
});
const emit = defineEmits(['update:externalState', 'menuToggled']);
const dropdownOpen = ref(false);
const dropdownItemHolder = ref(null);

const defaultOptions = {
    triggerStyles: '',
    dropdownStyles: '',
    transitionProps: {},
    closeOnOutsideClick: false,
    outsideClickCallback: null,
};

const finalOptions = computed(() => {
    return { ...defaultOptions, ...props.dropdownOptions };
});

const clickOutsideHandler = computed(() => {
    return finalOptions.value.closeOnOutsideClick ? outsideClickCloser : null;
});

const outsideClickCloser = () => {
    setDropdownOpenState(false);
};

const setDropdownOpenState = (openState = null) => {
    let newState = openState === null ? !dropdownOpen.value : openState;
    dropdownOpen.value = newState;

    if (newState !== props.externalState) {
        emit('update:externalState', newState);
    }

    if (props.onCloseCallback !== null && dropdownOpen.value === false) {
        props.onCloseCallback();
    }

    emit('menuToggled', newState);
};

const toggleDropdown = () => {
    setDropdownOpenState(!dropdownOpen.value);
};

watch(() => props.externalState, (newVal) => {
    if (newVal === false) {
        dropdownOpen.value = newVal;
    }
});
</script>
