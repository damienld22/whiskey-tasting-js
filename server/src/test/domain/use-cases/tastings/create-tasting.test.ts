import { Tasting, TastingForm } from '../../../../domain/entities/tasting';
import { TastingRepository } from '../../../../domain/interfaces/repositories/tasting-repository';
import { CreateTasting } from '../../../../domain/use-cases/tastings/create-tasting';

describe('Create tasting Use case', () => {
  class MockTastingRepository implements TastingRepository {
    editTasting(id: string, tasting: Partial<TastingForm>): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
    deleteTasting(id: string): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
    createTasting(tasting: Tasting): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
    getTastings(): Promise<Tasting[]> {
      throw new Error('Method not implemented.');
    }

  }

  let mockTastingRepository: MockTastingRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockTastingRepository = new MockTastingRepository();
  });

  test('should return true', async () => {
    const inputData = { score: 5, drinkName: 'drink' };
    jest.spyOn(mockTastingRepository, 'createTasting').mockImplementation(() => Promise.resolve(true));
    const createTastingUseCase = new CreateTasting(mockTastingRepository);
    const result = await createTastingUseCase.execute(inputData);
    expect(mockTastingRepository.createTasting).toBeCalledTimes(1);
    expect(result).toStrictEqual(true);
  });
});
