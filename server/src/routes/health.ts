import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ ok: true, timestamp: new Date().toISOString(), status: 'Healthy' });
});



export default router;
