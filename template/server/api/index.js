import { Router } from 'express';
import setSession from './routes/set-session';
import JWTsecure from './routes/jwt-secure';
{{#if i18n}}
import interfaceI18n from './routes/interface-i18n';
{{/if}}

const router = Router();

// System
router.use(JWTsecure);
router.use(setSession);

// Interface
{{#if i18n}}
router.use(interfaceI18n);
{{/if}}

export default router;
