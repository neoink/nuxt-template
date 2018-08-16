import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies

import locale from 'element-ui/lib/locale';
import langEN from 'element-ui/lib/locale/lang/en';
{{#if i18n}}
{{#arrayOf i18nConfig 'NL,BE'}}
import langNL from 'element-ui/lib/locale/lang/nl';
{{/arrayOf}}
{{#each i18nConfig as |value key|}}
{{#if_eq key 'FR'}}
import langFR from 'element-ui/lib/locale/lang/fr';
{{/if_eq}}
{{#if_eq key 'DE'}}
import langDE from 'element-ui/lib/locale/lang/de';
{{/if_eq}}
{{#if_eq key 'ES'}}
import langES from 'element-ui/lib/locale/lang/es';
{{/if_eq}}
{{#if_eq key 'IT'}}
import langIT from 'element-ui/lib/locale/lang/it';
{{/if_eq}}
{{/each}}
{{/if}}

import {
  // Pagination,
  // Dialog,
  // Autocomplete,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  // Menu,
  // Submenu,
  // MenuItem,
  // MenuItemGroup,
  // Input,
  // InputNumber,
  // Radio,
  // RadioGroup,
  // RadioButton,
  // Checkbox,
  // CheckboxButton,
  // CheckboxGroup,
  // Switch,
  // Select,
  // Option,
  // OptionGroup,
  // Button,
  // ButtonGroup,
  // Table,
  // TableColumn,
  // DatePicker,
  // TimeSelect,
  // TimePicker,
  // Popover,
  // Tooltip,
  // Breadcrumb,
  // BreadcrumbItem,
  // Form,
  // FormItem,
  // Tabs,
  // TabPane,
  // Tag,
  // Tree,
  // Alert,
  // Slider,
  // Icon,
  Row,
  Col,
  // Upload,
  // Progress,
  // Badge,
  // Card,
  // Rate,
  // Steps,
  // Step,
  // Carousel,
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  // Cascader,
  // ColorPicker,
  // Transfer,
  // Container,
  // Header,
  // Aside,
  // Main,
  // Footer,
  // Loading,
  // MessageBox,
  // Message,
  // Notification,
} from 'element-ui';

export default ({ params }) => {
  let localFileImport = langEN;
  {{#if i18n}}
  // Load locale by lang
  switch (params.lang) {
    {{#each i18nConfig as |value key|}}
    {{#if_eq key 'FR'}}
    case 'fr':
      localFileImport = langFR;
      break;
    {{/if_eq}}
    {{#if_eq key 'DE'}}
    case 'de':
      localFileImport = langDE;
      break;
    {{/if_eq}}
    {{#if_eq key 'NL'}}
    case 'nl':
      localFileImport = langNL;
      break;
    {{/if_eq}}
    {{#if_eq key 'BE'}}
    case 'be':
      localFileImport = langNL;
      break;
    {{/if_eq}}
    {{#if_eq key 'IE'}}
    case 'ie':
      localFileImport = langEN;
      break;
    {{/if_eq}}
    {{#if_eq key 'ES'}}
    case 'es':
      localFileImport = langES;
      break;
    {{/if_eq}}
    {{#if_eq key 'IT'}}
    case 'it':
      localFileImport = langIT;
      break;
    {{/if_eq}}
    {{/each}}
    default:
      localFileImport = langEN;
  }
  {{/if}}

  // Set locale into element ui
  locale.use(localFileImport);

  // Add elements into Vue
  Vue.use(Row);
  Vue.use(Col);
};
