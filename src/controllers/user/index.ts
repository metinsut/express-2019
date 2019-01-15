import { Request, Response } from 'express';
import { User } from '../../models/user';

const getAuthUser = (req: Request, res: Response) => {
   const getUser = User.findOne({ _id: req.params.userId }).select('-password');
   getUser
      .then((data) => {
         res.json({
            error: null,
            success: {
               user: data,
            },
         });
      })
      .catch((err) => {
         res.json({
            error: {
               message: 'Your user id that you want is incorrect',
            },
            success: null,
         });
      });
};

export { getAuthUser };
