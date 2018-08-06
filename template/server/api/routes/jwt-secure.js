import { Router } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from './../plugins/asyncHandler';

const router = Router();

router.get(
  '/secure',
  asyncHandler(async(req, res) => {
    // IP Filter
    if (req.app.get('allowedIP').indexOf(req.connection.remoteAddress) < 0) {
      return res.status(401).send('Not allowed');
    }

    // @TODO : fix crash app if jwt is expired
    // create a token
    const token = jwt.sign({ id: req.query.sessionID }, req.app.get('SECURE_KEY'), {
      expiresIn: 7200, // expires in 2 hours
    });

    res.json(token);
  }),
);

export default router;
