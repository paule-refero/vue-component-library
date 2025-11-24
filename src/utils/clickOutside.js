export const vClickOutside = {
    mounted(el, binding) {
        setupClickOutside(el, binding);
    },
    updated(el, binding) {
        // In case the callback function changes or is conditionally removed
        stopListeningForOutsideClicks(el);
        setupClickOutside(el, binding);
    },
    unmounted(el) {
        stopListeningForOutsideClicks(el);
    },
};

function setupClickOutside(el, binding) {
    el.__ClickOutsideEnabled = false;

    requestAnimationFrame(() => {
        el.__ClickOutsideEnabled = true;
    });

    if (typeof binding.value === 'function') {
        listenForOutsideClicks(el, binding.value);
    }
}

export const listenForOutsideClicks = (el, handler) => {
    el.__ClickOutsideHandler = (event) => {
        if (!el.__ClickOutsideEnabled) {
            return;
        }

        const target = event.target;

        if (!target || el.contains(target) || el === target) {
            return;
        }

        const isolatedItem = document.querySelectorAll('[data-inside-click-outside]');
        for (const insideEl of isolatedItem) {
            if (insideEl.contains(target)) {
                return;
            }
        }

        handler(event, el);
    };

    document.addEventListener('click', el.__ClickOutsideHandler, true);
};

export const stopListeningForOutsideClicks = (el) => {
    document.removeEventListener('click', el.__ClickOutsideHandler, true);
    delete el.__ClickOutsideHandler;
    delete el.__ClickOutsideEnabled;
};

export default {
    vClickOutside,
    listenForOutsideClicks,
    stopListeningForOutsideClicks,
};
