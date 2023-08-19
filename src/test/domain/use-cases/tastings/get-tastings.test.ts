import { Tasting } from "../../../../domain/entities/tasting";
import { TastingRepository } from "../../../../domain/interfaces/repositories/tasting-repository";
import { GetTastings } from "../../../../domain/use-cases/tastings/get-tastings";

describe('Get tastings Use case', () => {
  class MockTastingRepository implements TastingRepository {
    createTasting(tasting: Tasting): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    getTastings(): Promise<Tasting[]> {
      throw new Error("Method not implemented.");
    }
  }

  let mockTastingRepository: MockTastingRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockTastingRepository = new MockTastingRepository();
  });

  test('should return data', async () => {
    const expectedResult = [{ _id: "1", score: 5, drinkName: "drink" }];
    jest.spyOn(mockTastingRepository, 'getTastings').mockImplementation(() => Promise.resolve(expectedResult));
    const getTastingsUseCase = new GetTastings(mockTastingRepository);
    const result = await getTastingsUseCase.execute();
    expect(result).toStrictEqual(expectedResult);
  });
})