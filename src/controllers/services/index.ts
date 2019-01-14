import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import { User, IUser } from '../../models/user';

const passportService = () => {
   passport.serializeUser<any, any>((user, done) => {
      console.log('sssssss', user);
      done(undefined, user._id);
   });

   passport.deserializeUser((userData, done) => {
      User.findById(userData, (err, user) => {
         console.log('ddddddddddd', user);
         done(err, user._id);
      });
   });

   const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: process.env.SECRET,
   };

   const jtwLogin = new Strategy(jwtOptions, (payload, done) => {
      const matchUser = User.findById(payload.sub);
      matchUser
         .then((user: IUser) => {
            if (user) {
               console.log('jwt-1');
               done(null, user);
            } else {
               console.log('jwt-2');
               done(null, false);
            }
         })
         .catch((err: Error) => {
            console.log('jwt-3');
            done(err, false);
         });
   });

   const localOptions = {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
   };

   const localLogin = new LocalStrategy.Strategy(
      localOptions,
      (username: string, password: string, done: any) => {
         const findUser = User.findOne({ email: username });
         findUser
            .select('id name email avatar about')
            .then((user) => {
               if (!user) {
                  return done(null, false, {
                     message: 'invalid e-mail address or password',
                  });
               } else {
                  return done(null, user);
               }
            })
            .catch((err) => {
               return done(null, err);
            });
      },
   );

   passport.use(localLogin);
   passport.use(jtwLogin);
};

export default passportService;
