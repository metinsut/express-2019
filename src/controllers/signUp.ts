import express from 'express';
import userSchema from '../models/user';
const router = express.Router();

router.post('/', (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;

   if (!email || !password) {
      res.json({
         fail: 'You must provide email and password',
         state: null,
         success: null,
      });
   } else {
      const findUser = userSchema.findOne({ email });

      findUser
         .then((data) => {
            if (data) {
               res.json({
                  fail: 'Email is in use',
                  state: null,
                  success: null,
               });
            } else {
               const user = new userSchema({
                  email,
                  password,
               });
               const saveUser = user.save();
               saveUser
                  .then((userInfo) => {
                     res.json({
                        fail: null,
                        state: null,
                        success: {
                           user: {
                              id: userInfo.id,
                              email: userInfo.email,
                           },
                        },
                     });
                  })
                  .catch((err) => {
                     res.json({
                        fail: {
                           type: 'Save problem',
                           error: err,
                        },
                        state: null,
                        success: null,
                     });
                  });
            }
         })
         .catch((err) => {
            res.json({
               fail: {
                  type: 'Find problem',
                  error: err,
               },
               state: null,
               success: null,
            });
         });
   }
});

export default router;
