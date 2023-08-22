import express, { Request, Response } from 'express';
import { GetTastingsUseCase } from '../../interfaces/use-cases/get-tastings';
import { CreateTastingUseCase } from '../../interfaces/use-cases/create-tasting';
import { validate } from '../middlewares/validation';
import { TastingFormSchema } from '../../entities/tasting';

export default function TastingsRouter(
  getTastingsUseCase: GetTastingsUseCase,
  createTastingUseCase: CreateTastingUseCase,
) {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response) => {
    try {
      const tastings = await getTastingsUseCase.execute();
      res.send(tastings);
    } catch (err) {
      res.status(500).send({ message: 'Error fetching tastings' });
    }
  });

  router.post('/', validate(TastingFormSchema), async (req: Request, res: Response) => {
    try {
      await createTastingUseCase.execute(req.body);
      res.status(201).json({ message: 'Tasting created' });
    } catch (err) {
      res.status(500).send({ message: 'Error saving tasting' });
    }
  });

  return router;
}
