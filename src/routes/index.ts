import express, { Request, Response, NextFunction } from 'express';
import index from '../controllers';
import singUp from '../controllers/signUp';
import singIn from '../controllers/signIn';
import verifyUser from '../middleware/veriyfUser';
import dashboard from '../controllers/dashboard';

const router = express.Router();

/* Error handler for async / await functions */
const catchErrors = (fn: any) => {
   return (req: Request, res: Response, next: NextFunction) => {
      return fn(req, res, next).catch(next);
   };
};

router.route('/').get(index);

router.get('/signup', singUp);
router.get('/signin', singIn);
router.get('/dash', verifyUser, dashboard);

export default router;
