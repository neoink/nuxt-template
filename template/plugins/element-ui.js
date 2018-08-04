import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies

import locale from 'element-ui/lib/locale';
import langEN from 'element-ui/lib/locale/lang/en';
{{#if i18n}}
import langFR from 'element-ui/lib/locale/lang/fr';
import langDE from 'element-ui/lib/locale/lang/de';
import langNL from 'element-ui/lib/locale/lang/nl';
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
    case 'fr':
      localFileImport = langFR;
      break;
    case 'de':
      localFileImport = langDE;
      break;
    case 'nl':
      localFileImport = langNL;
      break;
    case 'be':
      localFileImport = langNL;
      break;
    case 'ie':
      localFileImport = langEN;
      break;
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
