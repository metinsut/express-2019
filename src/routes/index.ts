import express, { Request, Response, NextFunction } from 'express';
import Home from '../controllers';
import passportService from '../controllers/services/index';
import { signUp, validateSignUp } from '../controllers/auth/signUp';
import { signIn } from '../controllers/auth/signIn';
import { getAuthUser } from '../controllers/user';
import signOut from '../controllers/auth/signOut';
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

router.post('/signup', validateSignUp, catchErrors(signUp));
router.post('/signin', signIn);
router.post('/signout', signOut);

router.route('/').get(Home);

router.post('/users/:userId', verifyUser, getAuthUser);

router.post('/dash', verifyUser, dashboard);

export default router;
