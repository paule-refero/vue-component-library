export {
    FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText,
} from '@fortawesome/vue-fontawesome';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

import {
    faCaretDown,
    faGear, faXmark,
} from '@fortawesome/free-solid-svg-icons';


library.add(
    faCaretDown, faGear, faXmark
);
