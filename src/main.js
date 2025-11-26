import { FontAwesomeIcon, FontAwesomeLayers } from '@/utils/fontAwesomeIcons';
import BaseButton from '@components/BaseButton.vue';
import BaseCard from '@components/BaseCard.vue';
import BaseBadge from '@components/BaseBadge.vue';
import BaseInput from '@components/BaseInput.vue';
import BaseLink from '@components/BaseLink.vue';
import BaseSelect from '@components/BaseSelect.vue';
import BaseTextarea from '@components/BaseTextarea.vue';
import BaseFormField from '@components/BaseFormField.vue';
import BasePasswordField from '@components/BasePasswordField.vue';
import { createAppRouter } from './router/index.js';

const components = {
    FontAwesomeIcon,
    FontAwesomeLayers,
    BaseBadge,
    BaseButton,
    BaseCard,
    BaseInput,
    BaseLink,
    BaseSelect,
    BaseTextarea,
    BaseFormField,
    BasePasswordField,
}

const install = (app, options = {}) => {
    if (install.installed) {
        return;
    }

    install.installed = true;

    Object.entries(components).forEach(([name, component]) => {
        app.component(name, component);
    })

    // Install Vue Router if router option is provided
    if (options.router) {
        app.use(options.router);
    }
}

export default {
    install,
    ...components,
}

export {
    FontAwesomeIcon,
    FontAwesomeLayers,
    BaseBadge,
    BaseButton,
    BaseCard,
    BaseInput,
    BaseLink,
    BaseSelect,
    BaseTextarea,
    BaseFormField,
    BasePasswordField,
    createAppRouter,
}
