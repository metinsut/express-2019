import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
   res.json({ name: 'John Doe' });
});

export default router;
