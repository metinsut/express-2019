import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jwt-simple';
import userSchema from '../models/user';
import { SECRET } from '../config/secret';

const router = express.Router();

router.post('/', (req, res) => {
   const email = req.body.email;
   const password = req.body.password;

   if (!email || !password) {
      res.json({
         fail: 'You must provide email and password',
         state: null,
         success: null,
      });
   }
   const findUser = userSchema.findOne({ email });
   findUser
      .then((data) => {
         const token = jwt.encode(data.email, SECRET);
         const userData = {
            email: data.email,
            auth: 'isActive',
            token,
         };
         res.json(userData);
      })
      .catch((err) => {
         res.json({
            status: false,
            message: ' Authenticate failed, user not found.',
            error: err,
         });
      });
});

export default router;
