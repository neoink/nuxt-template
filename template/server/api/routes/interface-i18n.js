import { Router } from 'express';
import fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';

import client from './../plugins/redis';
import asyncHandler from './../plugins/asyncHandler';

const getClientAsync = promisify(client.get).bind(client);

const router = Router();

const langMap = {
  en: 'en-GB.json',
  {{#each i18nConfig as |value key|}}
  {{#if_eq key 'FR'}}
  {{#if value}}
  fr: 'fr-FR.json',
  {{/if}}
  {{/if_eq}}
  {{#if_eq key 'IE'}}
  {{#if value}}
  ie: 'en-IE.json',
  {{/if}}
  {{/if_eq}}
  {{#if_eq key 'NL'}}
  {{#if value}}
  nl: 'nl-NL.json',
  {{/if}}
  {{/if_eq}}
  {{#if_eq key 'BE'}}
  {{#if value}}
  be: 'nl-BE.json',
  {{/if}}
  {{/if_eq}}
  {{#if_eq key 'DE'}}
  {{#if value}}
  de: 'de-DE.json',
  {{/if}}
  {{/if_eq}}
  {{#if_eq key 'ES'}}
  {{#if value}}
  es: 'es-ES.json',
  {{/if}}
  {{/if_eq}}
  {{#if_eq key 'IT'}}
  {{#if value}}
  it: 'it-IT.json',
  {{/if}}
  {{/if_eq}}
  {{/each}}          
};

function getLang(idLang) {
  let obj;

  return new Promise((resolve, reject) => {
    fs.readFile(join(__dirname, `/../../lang/${langMap[idLang]}`), 'utf8', (err, data) => {
      if (err) {
        // If error return reject promise
        return reject(err);
      }

      obj = JSON.parse(data);
      // return solve promise
      return resolve(obj);
    });
  });
}

router.get(
  '/interface-i18n',
  asyncHandler(async(req, res) => {
    let result;

    // IP Filter
    if (req.app.get('allowedIP').indexOf(req.connection.remoteAddress) < 0) {
      return res.status(401).send('Not allowed');
    }

    // If language parameter if not in langMap =>
    // return default language for redirect 404 page in nuxt
    if (Object.keys(langMap).indexOf(req.query.lang) === -1) {
      return res
        .status(404)
        .send({ error: `InterfaceI18n : ${req.query.lang} lang does not exist` });
    }

    // Get redis cache
    const i18nCache = await getClientAsync(`i18n_${req.query.lang}`);

    // If no cache, get json files and set redis cache
    if (i18nCache === null) {
      result = await getLang(req.query.lang);
      client.set(`i18n_${req.query.lang}`, JSON.stringify(result), 'EX', 604800);
    } else {
      // Else get redis cache return
      result = JSON.parse(i18nCache);
    }

    res.json(result);
  }),
);

export default router;
