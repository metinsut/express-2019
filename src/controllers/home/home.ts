import { Request, Response } from 'express';

const Home = (req: Request, res: Response) => {
   res.json({ name: 'Express 2019' });
};

export default Home;
