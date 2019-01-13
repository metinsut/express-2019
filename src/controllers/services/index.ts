import passport from 'passport';
import JwtStrategy from 'passport-jwt';
import ExtractJwt from 'passport-jwt';
import LocalStrategy from 'passport-local';
import { User, IUser } from '../../models/user';

const passportService = () => {
   // JwtStrategy.Strategy();
   // ExtractJwt.ExtractJwt();

   // passport.serializeUser(User.serializeUser());
   // passport.deserializeUser(User.deserializeUser());

   // passport.serializeUser<any, any>((user, done) => {
   //    done(undefined, user.id);
   // });

   // passport.deserializeUser((id, done) => {
   //    User.findById(id, (err, user) => {
   //       done(err, user);
   //    });
   // });

   // passport.serializeUser((user, done) => {
   //    done(null, user);
   // });
   // passport.deserializeUser((user, done) => {
   //    done(null, user);
   // });

   // const jwtOptions = {
   //    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
   //    secretOrKey: process.env.SECRET,
   // };

   // const jtwLogin = new JwtStrategy(jwtOptions, (payload, done) => {
   //    const matchUser = User.findById(payload.sub).select('email');
   //    console.log(payload);
   //    matchUser
   //       .then((user: IUser) => {
   //          if (user) {
   //             done(null, user);
   //          } else {
   //             done(null, false);
   //          }
   //       })
   //       .catch((err: Error) => {
   //          done(err, false);
   //       });
   // });

   // const localLogin = new LocalStrategy.Strategy(User.authenticate());

   // passport.use(new LocalStrategy(User.authenticate()));

   const localOptions = {
      usernameField: 'email',
   };

   const localLogin = new LocalStrategy.Strategy(
      localOptions,
      (email: string, password: string, done: any) => {
         const findUser = User.findOne({ email });
         findUser
            .then((user) => {
               if (!user) {
                  console.log('l1');
                  return done(null, false);
               } else {
                  console.log('l2');
                  return done(null, user);
               }
            })
            .catch((err) => {
               console.log('l3');
               return done(null, err);
            });
      },
   );

   passport.use(localLogin);
};

export default passportService;
