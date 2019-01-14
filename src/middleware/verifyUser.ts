import passport from 'passport';

const verifyUser = (req: any, res: any, next: any) => {
   console.log(req.headers.authorization);
   passport.authenticate('jwt', (err, user, info) => {
      console.log(err);
      console.log(user);
      console.log(info);
      if (err) {
         console.log('ver-1');
         return next(err);
      }
      if (!user) {
         console.log('ver-2');
         return res.json(err);
      }
      req.logIn(user, (error: Error) => {
         if (error) {
            console.log('ver-3');
            return next(error);
         }
         console.log('ver-3');
         return next(true);
      });
   })(req, res, next);
};

// const requireAuth = passport.authenticate('jwt', { session: false });

export default verifyUser;
// export default requireAuth;
