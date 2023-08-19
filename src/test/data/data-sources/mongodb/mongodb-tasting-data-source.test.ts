import { MongoDBTastingDataSource } from "../../../../data/data-sources/mongodb/mongodb-tasting-data-source";
import { DatabaseWrapper } from "../../../../data/interfaces/data-sources/database-wrapper"
import { TastingForm } from "../../../../domain/entities/tasting";

describe('MongoDB DataSource', () => {
  let mockDatabase: DatabaseWrapper;

  beforeAll(() => {
    mockDatabase = {
      find: jest.fn(),
      insertOne: jest.fn()
    }
  });

  test('getAll', async () => {
    const expectedData = [{ id: "1", score: 5, drinkName: "drink" }];
    const datasource = new MongoDBTastingDataSource(mockDatabase);
    jest.spyOn(mockDatabase, 'find').mockImplementation(() => Promise.resolve(expectedData));
    const result = await datasource.getAll();
    expect(mockDatabase.find).toHaveBeenCalledWith({});
    expect(result).toStrictEqual(expectedData);
  });

  test('create', async () => {
    const inputData = { score: 5, drinkName: "drink" };
    const datasource = new MongoDBTastingDataSource(mockDatabase);
    jest.spyOn(mockDatabase, 'insertOne').mockImplementation(() => Promise.resolve({ insertedId: 123 }));
    const result = await datasource.create(inputData);
    expect(mockDatabase.insertOne).toHaveBeenCalledWith(inputData);
    expect(result).toStrictEqual(true);
  })
})