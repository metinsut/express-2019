import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jtw from 'jwt-simple';
import { User, IUser } from '../../models/user';

// const requireSignIn = passport.authenticate('local', { session: false });

const tokenForUser = (user: any) => {
   const timestamp = new Date().getTime();
   return jtw.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
   // const { name, email, password } = req.body;
   passport.authenticate('local', (err, user, info) => {
      if (err) {
         console.log('s1');
         return res.status(500).json({
            error: err.message,
            success: null,
         });
      }
      if (!user) {
         console.log('s2');
         return res.status(400).json({
            error: info.message,
            success: null,
         });
      }
      req.logIn(user, (error: Error) => {
         if (error) {
            console.log('s3');
            return res.status(500).json({
               error: error.message,
               success: null,
            });
         }
         console.log('s4');
         res.json({
            error: null,
            success: {
               message: 'Successfully registered.',
               isAuth: true,
               token: tokenForUser(user),
               user,
            },
         });
      });
   })(req, res, next);
};

export { signIn };
