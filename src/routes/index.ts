import express, { Request, Response, NextFunction } from 'express';
import passport = require('passport');
import Home from '../controllers';
import passportService from '../controllers/services/index';
import { signUp, validateSignUp } from '../controllers/auth/signUp';
import { signIn } from '../controllers/auth/signIn';
import verifyUser from '../middleware/verifyUser';
import dashboard from '../controllers/dashboard';

const router = express.Router();
passportService();

/* Error handler for async / await functions */
const catchErrors = (fn: any) => {
   return (req: Request, res: Response, next: NextFunction) => {
      return fn(req, res, next).catch(next);
   };
};

router.route('/').get(Home);

router.post('/signup', validateSignUp, catchErrors(signUp));
router.post('/signin', catchErrors(signIn));
router.post('/dash', verifyUser, dashboard);

export default router;
