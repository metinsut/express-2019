import { Request, Response } from 'express';

const Home = (req: Request, res: Response) => {
   res.json({ name: 'John Doe' });
};

export default Home;
