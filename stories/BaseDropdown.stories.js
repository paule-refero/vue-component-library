import BaseDropdown from "../src/components/BaseDropdown.vue";
import { within, userEvent } from "storybook/test";

export default {
    title: "Components/BaseDropdown",
    component: BaseDropdown,
    tags: ["autodocs"],
};

// Browser-safe spy helper
const createSpy = () => {
    const spy = { called: false };
    const fn = () => {
        spy.called = true;
    };
    return { spy, fn };
};

// ------------------------
// Default dropdown - opens and shows items
// ------------------------
export const Default = {
    args: {
        triggerText: "Options",
        triggerIcon: "fa-angle-down",
    },
    render: (args) => ({
        components: { BaseDropdown },
        setup() {
            return { args };
        },
        template: `
      <BaseDropdown v-bind="args">
        <template #default>
          <div class="p-2">Item 1</div>
          <div class="p-2">Item 2</div>
        </template>
      </BaseDropdown>
    `,
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // find the trigger by its accessible name
        const trigger = canvas.getByRole("button", { name: /Options/i });

        // initially closed
        if (canvas.queryByText("Item 1")) {
            throw new Error("Dropdown should be closed initially");
        }

        await userEvent.click(trigger);

        // wait for item to appear (handles transitions)
        await canvas.findByText("Item 1");
        canvas.getByText("Item 2");

        // close by clicking the trigger again
        await userEvent.click(trigger);

        // small delay for closing transition
        await new Promise((r) => setTimeout(r, 50));

        if (canvas.queryByText("Item 1")) {
            throw new Error("Dropdown did not close after toggling the trigger");
        }
    },
};

// ------------------------
// Custom trigger slot
// ------------------------
export const CustomTrigger = {
    render: (args) => ({
        components: { BaseDropdown },
        setup() {
            return { args };
        },
        template: `
      <BaseDropdown v-bind="args">
        <template #dropdownTrigger="{ toggle }">
          <button @click="toggle" class="bg-purple-600 text-white px-3 py-1 rounded">
            Custom Trigger
          </button>
        </template>
        <template #default>
          <div class="p-2">Custom Item</div>
        </template>
      </BaseDropdown>
    `,
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", { name: /Custom Trigger/i });

        await userEvent.click(trigger);
        await canvas.findByText("Custom Item");
    },
};

// ------------------------
// onCloseCallback prop: ensure prop callback runs when dropdown closes
// ------------------------
export const OnClosePropCallback = (() => {
    const { spy, fn } = createSpy();
    return {
        args: {
            triggerText: "Prop Callback",
            onCloseCallback: fn,
            _spy: spy,
        },
        render: (args) => ({
            components: { BaseDropdown },
            setup() {
                return { args };
            },
            template: `
                <BaseDropdown v-bind="args">
                    <template #default>
                        <div class="p-2">Prop callback fires when dropdown closes</div>
                    </template>
                </BaseDropdown>
            `,
        }),
        play: async ({ canvasElement, args }) => {
            const canvas = within(canvasElement);
            const trigger = canvas.getByRole("button", { name: /Prop Callback/i });

            // open
            await userEvent.click(trigger);
            await canvas.findByText(/Prop callback fires when dropdown closes/i);

            // close by clicking trigger again (toggle)
            await userEvent.click(trigger);

            // allow time for close callback
            await new Promise((r) => setTimeout(r, 50));

            if (!args._spy.called) {
                throw new Error("onCloseCallback was not called!");
            }
        },
    };
})();
