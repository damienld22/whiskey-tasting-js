import { TastingDataSource } from "../../../data/interfaces/data-sources/tasting-data-source";
import { Tasting } from "../../../domain/entities/tasting";
import { TastingRepository } from "../../../domain/interfaces/repositories/tasting-repository";
import { TastingRepositoryImpl } from "../../../domain/repositories/tasting-repository";

class MockTastingDataSource implements TastingDataSource {
  create(tasting: Tasting): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Tasting[]> {
    throw new Error("Method not implemented.");
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
      const expectedData = [{ id: "1", score: 5, drinkName: "drink" }] satisfies Tasting[];
      jest.spyOn(mockTastingDataSource, 'getAll').mockImplementation(() => Promise.resolve(expectedData));
      const result = await tastingRepository.getTastings();
      expect(result).toStrictEqual(expectedData);
    });
  })

  describe('createTasting', () => {
    test('should return true', async () => {
      const inputData = { id: "1", score: 5, drinkName: "drink" } satisfies Tasting;
      jest.spyOn(mockTastingDataSource, 'create').mockImplementation(() => Promise.resolve(true));
      const result = await tastingRepository.createTasting(inputData);
      expect(mockTastingDataSource.create).toBeCalledTimes(1);
      expect(result).toStrictEqual(true);
    });
  })
})