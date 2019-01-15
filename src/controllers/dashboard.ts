import { Request, Response } from 'express';

const Dashboard = (req: Request, res: Response) => {
   res.json({
      error: null,
      success: {
         title: 'Dashboard',
      },
   });
};

export default Dashboard;
