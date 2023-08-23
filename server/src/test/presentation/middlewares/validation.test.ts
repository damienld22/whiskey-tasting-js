import { z } from 'zod';
import { validate } from '../../../domain/presentation/middlewares/validation';
import { Request } from 'express';

describe('validate zod schema', () => {
  const res = { status: jest.fn().mockReturnValue({ json: jest.fn() }) } as any;
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('should be OK if the schema is correct', async () => {
    // Arrange
    const schema = z.object({ value: z.string() });
    const body = { value: 'value' };

    // Act
    const middleware = validate(schema);
    await middleware({ body } as Request, res, next);

    // Assert
    expect(next).toHaveBeenCalled();
  });

  test('should return zod erreur if the body not match the schema', async () => {
    // Arrange
    const schema = z.object({ value: z.string() });
    const body = { value: 1 };

    // Act
    const middleware = validate(schema);
    await middleware({ body } as Request, res, next);

    // Assert
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toBeCalledWith(400);
  });
})