import { Router } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from './../plugins/asyncHandler';

const router = Router();

router.post(
  '/set-session',
  asyncHandler(async(req, res) => {
    // Token security
    await jwt.verify(req.session.token, req.app.get('JWT_SECRET'));

    const { data, key } = req.body;

    req.session[key] = data;
    await req.session.save();

    res.json({
      data: {
        status: 'OK',
      },
    });
  }),
);

export default router;
