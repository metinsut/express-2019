import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
   passport.authenticate('jwt', (err, user, info) => {
      if (err) {
         return next(err);
      }
      if (!user) {
         return res.status(401).json({
            error: {
               message: 'You unauthenticated, please login.',
            },
            success: null,
         });
      }
      req.login(user, (error: Error) => {
         if (error) {
            return next(error);
         }
         return next();
      });
   })(req, res, next);
};

export default verifyUser;
