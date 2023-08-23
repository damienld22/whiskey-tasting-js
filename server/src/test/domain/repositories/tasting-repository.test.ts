import { TastingDataSource } from '../../../data/interfaces/data-sources/tasting-data-source';
import { Tasting, TastingForm } from '../../../domain/entities/tasting';
import { TastingRepository } from '../../../domain/interfaces/repositories/tasting-repository';
import { TastingRepositoryImpl } from '../../../domain/repositories/tasting-repository';

class MockTastingDataSource implements TastingDataSource {
  editOne(id: string, tasting: Partial<TastingForm>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  create(tasting: TastingForm): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Tasting[]> {
    throw new Error('Method not implemented.');
  }
}

describe('Tasting repository', () => {
  let mockTastingDataSource: MockTastingDataSource;
  let tastingRepository: TastingRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockTastingDataSource = new MockTastingDataSource();
    tastingRepository = new TastingRepositoryImpl(mockTastingDataSource);
  });

  describe('getTastings', () => {
    test('should return data', async () => {
      const expectedData = [{ _id: '1', score: 5, drinkName: 'drink' }];
      jest.spyOn(mockTastingDataSource, 'getAll').mockImplementation(() => Promise.resolve(expectedData));
      const result = await tastingRepository.getTastings();
      expect(result).toStrictEqual(expectedData);
    });
  });

  describe('createTasting', () => {
    test('should return true', async () => {
      const inputData = { score: 5, drinkName: 'drink' };
      jest.spyOn(mockTastingDataSource, 'create').mockImplementation(() => Promise.resolve(true));
      const result = await tastingRepository.createTasting(inputData);
      expect(mockTastingDataSource.create).toBeCalledTimes(1);
      expect(result).toStrictEqual(true);
    });
  });

  describe('editTasting', () => {
    test('should return true', async () => {
      const id = '111111111111';
      const inputData = { score: 5, drinkName: 'drink' };
      jest.spyOn(mockTastingDataSource, 'editOne').mockImplementation(() => Promise.resolve(true));
      const result = await tastingRepository.editTasting(id, inputData);
      expect(mockTastingDataSource.editOne).toBeCalledTimes(1);
      expect(result).toStrictEqual(true);
    });
  });

  describe('deleteTasting', () => {
    test('should return true', async () => {
      const id = '111111111111';
      jest.spyOn(mockTastingDataSource, 'deleteOne').mockImplementation(() => Promise.resolve(true));
      const result = await tastingRepository.deleteTasting(id);
      expect(mockTastingDataSource.deleteOne).toBeCalledTimes(1);
      expect(result).toStrictEqual(true);
    });
  });
});
