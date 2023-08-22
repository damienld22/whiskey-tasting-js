import { Tasting } from '../../../../domain/entities/tasting';
import { TastingRepository } from '../../../../domain/interfaces/repositories/tasting-repository';
import { CreateTasting } from '../../../../domain/use-cases/tastings/create-tasting';

describe('Create tasting Use case', () => {
  class MockTastingRepository implements TastingRepository {
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
