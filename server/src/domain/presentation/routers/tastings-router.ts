import express, { Request, Response } from 'express';
import multer from 'multer';
import { GetTastingsUseCase } from '../../interfaces/use-cases/get-tastings';
import { CreateTastingUseCase } from '../../interfaces/use-cases/create-tasting';
import { validate } from '../middlewares/validation';
import { EditTastingFormSchema, TastingFormSchema } from '../../entities/tasting';
import { EditTastingUseCase } from '../../interfaces/use-cases/edit-tasting';
import { DeleteTastingUseCase } from '../../interfaces/use-cases/delete-tasting';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets')
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename)
  },
})

const upload = multer({ dest: 'assets/', storage });

export default function TastingsRouter(
  getTastingsUseCase: GetTastingsUseCase,
  createTastingUseCase: CreateTastingUseCase,
  editTastingUseCase: EditTastingUseCase,
  deleteTastingUseCase: DeleteTastingUseCase
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

  router.patch('/:id', validate(EditTastingFormSchema), async (req: Request, res: Response) => {
    try {
      await editTastingUseCase.execute(req.params.id, req.body);
      res.status(201).json({ message: 'Tasting updated' });
    } catch (err) {
      res.status(500).send({ message: 'Error editing tasting' });
    }
  });

  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      await deleteTastingUseCase.execute(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).send({ message: 'Error deleting tasting' });
    }
  });

  router.post('/picture', async (req: Request, res: Response) => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        res.status(500).send({ message: 'Error uploading picture' });
      } else {
        res.status(200).json({ message: 'Picture uploaded', path: req.file?.path });
      }
    });
  })

  return router;
}
