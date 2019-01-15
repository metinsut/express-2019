import { Request, Response } from 'express';

const signOut = (req: Request, res: Response) => {
   console.log(req.user);
   console.log('out');
   req.logout();
   res.json({
      fail: false,
      success: {
         message: 'You have been log out.',
      },
   });
};

export default signOut;
