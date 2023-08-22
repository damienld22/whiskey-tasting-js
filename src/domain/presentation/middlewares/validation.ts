import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const validate = (schema: z.AnyZodObject | z.ZodOptionalType<z.AnyZodObject>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (err) {
      let error = err;
      if (error instanceof z.ZodError) {
        error = error.issues.map((e) => ({ path: e.path[0], message: e.message }));
      }

      return res.status(400).json({
        status: 'failed',
        error,
      });
    }
  };
};
