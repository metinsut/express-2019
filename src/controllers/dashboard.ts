import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
   res.json({ name: 'DASHBOARD' });
});

export default router;
