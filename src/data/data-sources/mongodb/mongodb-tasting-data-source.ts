import { Tasting } from "../../../domain/entities/tasting";
import { DatabaseWrapper } from "../../interfaces/data-sources/database-wrapper";
import { TastingDataSource } from "../../interfaces/data-sources/tasting-data-source";

export class MongoDBTastingDataSource implements TastingDataSource {

  private database: DatabaseWrapper;

  constructor(database: DatabaseWrapper) {
    this.database = database;
  }

  async create(tasting: Tasting): Promise<boolean> {
    const result = await this.database.insertOne(tasting);
    return result !== null;
  }

  async getAll(): Promise<Tasting[]> {
    const result = await this.database.find({});
    return result;
  }
}