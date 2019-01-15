import { Request, Response } from 'express';

const signOut = (req: Request, res: Response) => {
   req.logout();
   res.json({
      fail: false,
      success: {
         message: 'You have been log out.',
      },
   });
};

export default signOut;
