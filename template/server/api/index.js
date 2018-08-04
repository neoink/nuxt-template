import { Router } from 'express';
{{#if i18n}}
import interfaceI18n from './routes/interface-i18n';
{{/if}}

const router = Router();

// Interface
{{#if i18n}}
router.use(interfaceI18n);
{{/if}}

export default router;
