import { FontAwesomeIcon, FontAwesomeLayers } from '@/utils/fontAwesomeIcons';
import BaseButton from '@components/BaseButton.vue';
import BaseCard from '@components/BaseCard.vue';
import BaseBadge from '@components/BaseBadge.vue';

// Components to register globally
const components = {
    FontAwesomeIcon,
    FontAwesomeLayers,
    BaseBadge,
    BaseButton,
    BaseCard,
}

const install = (app) => {
    if (install.installed) {
        return;
    }

    install.installed = true;

    // Register all components globally
    Object.entries(components).forEach(([name, component]) => {
        app.component(name, component);
    })
}

// Allow both `app.use(Library)` and individual imports
export default {
    install,
    ...components,
}

// Named exports for individual usage
export {
    FontAwesomeIcon,
    FontAwesomeLayers,
    BaseBadge,
    BaseButton,
    BaseCard,
}
