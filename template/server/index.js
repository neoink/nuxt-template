import express from 'express';
import session from 'express-session';
import uuid from 'uuid/v4';
import { Nuxt, Builder } from 'nuxt';
import {} from 'dotenv/config';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import api from './api';

const RedisStore = require('connect-redis')(session);

const app = express();

const host = process.env.HOST || 'localhost';

const port = process.env.PORT || 3000;

const apiInternalUrl = `${process.env.HOST}:${process.env.PORT}`;
const apiExternalUrl =
  process.env.NODE_ENV === 'production' ? `${process.env.STARGATE_HOST}` : apiInternalUrl;

/**
 * TYPESITE VARIABLE ENV
 * @TODO : inject into nuxt context (this.$typeSite)
 */
// console.log(process.env.TYPE_SITE)

app.set('port', port); // Set port into express app
app.set('trust proxy', true); // Configure express proxy
app.set('allowedIP', ['127.0.0.1']); // Allowed IP for internatal API
app.set('JWT_SECRET', '{{ JWTSecret }}'); // Secure Key for JWT

// Set api URL
app.set('API_INTERNAL_URL', apiInternalUrl);
app.set('API_EXTERNAL_URL', apiExternalUrl);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Secure Express app
app.use(helmet());
app.use(cors());

// Use Redis middleware for store session
app.use(
  session({
    genid: () => uuid(), // use UUIDs for session IDs
    store: new RedisStore({
      host: process.env.REDIS_HOST || 'localhost',
      port: '6379',
      ttl: 86400,
      db: 1,
    }),
    secret: '{{ redisSecret }}',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use('/api/v1/', api); // Import API Routes

const config = require('../nuxt.config.js');

config.dev = !(process.env.NODE_ENV === 'production');

const nuxt = new Nuxt(config);

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt);

  builder.build();
}

app.use(nuxt.render); // Give nuxt middleware to express

app.listen(port, host); // Listen the server
console.log(`Server listening on ${host}:${port}`); // eslint-disable-line no-console
