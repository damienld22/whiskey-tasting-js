import request from 'supertest';
import { GetTastingsUseCase } from '../../../domain/interfaces/use-cases/get-tastings';
import { Tasting, TastingForm } from '../../../domain/entities/tasting';
import { CreateTastingUseCase } from '../../../domain/interfaces/use-cases/create-tasting';
import TastingsRouter from '../../../domain/presentation/routers/tastings-router';
import server from '../../../server';
import { EditTastingUseCase } from '../../../domain/interfaces/use-cases/edit-tasting';
import { DeleteTastingUseCase } from '../../../domain/interfaces/use-cases/delete-tasting';

class MockGetTastingsUseCase implements GetTastingsUseCase {
  execute(): Promise<Tasting[]> {
    throw new Error('Method not implemented.');
  }
}

class MockCreateTastingUseCase implements CreateTastingUseCase {
  execute(tasting: Tasting): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

class MockEditTastingsUseCase implements EditTastingUseCase {
  execute(id: string, tasting: Partial<TastingForm>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

class MockDeleteTastingUseCase implements MockDeleteTastingUseCase {
  execute(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

describe('Tastings Router', () => {
  let mockGetTastingsUseCase: GetTastingsUseCase;
  let mockCreateTastingUseCase: CreateTastingUseCase;
  let mockEditTastingUseCase: EditTastingUseCase;
  let mockDeleteTastingUseCase: DeleteTastingUseCase;

  beforeAll(() => {
    mockGetTastingsUseCase = new MockGetTastingsUseCase();
    mockCreateTastingUseCase = new MockCreateTastingUseCase();
    mockEditTastingUseCase = new MockEditTastingsUseCase();
    mockDeleteTastingUseCase = new MockDeleteTastingUseCase();
    server.use('/tastings', TastingsRouter(mockGetTastingsUseCase, mockCreateTastingUseCase, mockEditTastingUseCase, mockDeleteTastingUseCase));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /tastings', () => {
    test('should return 200 with data', async () => {
      const expectedData = [{ _id: '1', score: 5, drinkName: 'drink' }];
      jest.spyOn(mockGetTastingsUseCase, 'execute').mockImplementation(() => Promise.resolve(expectedData));

      const response = await request(server).get('/tastings');

      expect(response.status).toBe(200);
      expect(mockGetTastingsUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(expectedData);
    });

    test('GET /tastings returns 500 on use case error', async () => {
      jest.spyOn(mockGetTastingsUseCase, 'execute').mockImplementation(() => Promise.reject(Error()));
      const response = await request(server).get('/tastings');
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: 'Error fetching tastings' });
    });
  });

  describe('POST /tasting', () => {
    test('should return 201', async () => {
      const inputData = { score: 5, drinkName: 'drink' };
      jest.spyOn(mockCreateTastingUseCase, 'execute').mockImplementation(() => Promise.resolve(true));
      const response = await request(server).post('/tastings').send(inputData);
      expect(response.status).toBe(201);
    });

    test('POST /tastings returns 500 on use case error', async () => {
      const inputData = { score: 5, drinkName: 'drink' };
      jest.spyOn(mockCreateTastingUseCase, 'execute').mockImplementation(() => Promise.reject(Error()));
      const response = await request(server).post('/tastings').send(inputData);
      expect(response.status).toBe(500);
    });
  });

  describe('PATCH /tasting/:id', () => {
    test('should return 201', async () => {
      const id = '111111111111';
      const inputData = { score: 5, drinkName: 'drink' };
      jest.spyOn(mockEditTastingUseCase, 'execute').mockImplementation(() => Promise.resolve(true));
      const response = await request(server).patch(`/tastings/${id}`).send(inputData);
      expect(response.status).toBe(201);
    });

    test('PATCH /tastings/:id returns 500 on use case error', async () => {
      const id = '111111111111';
      const inputData = { score: 5, drinkName: 'drink' };
      jest.spyOn(mockEditTastingUseCase, 'execute').mockImplementation(() => Promise.reject(Error()));
      const response = await request(server).patch(`/tastings/${id}`).send(inputData);
      expect(response.status).toBe(500);
    });
  });

  describe('DELETE /tasting/:id', () => {
    test('should return 204', async () => {
      const id = '111111111111';
      jest.spyOn(mockDeleteTastingUseCase, 'execute').mockImplementation(() => Promise.resolve(true));
      const response = await request(server).delete(`/tastings/${id}`).send();
      expect(response.status).toBe(204);
    });

    test('DELETE /tastings/:id returns 500 on use case error', async () => {
      const id = '111111111111';
      jest.spyOn(mockDeleteTastingUseCase, 'execute').mockImplementation(() => Promise.reject(Error()));
      const response = await request(server).delete(`/tastings/${id}`).send();
      expect(response.status).toBe(500);
    });
  });
});
