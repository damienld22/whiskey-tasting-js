import { TastingDataSource } from "../../data/interfaces/data-sources/tasting-data-source";
import { Tasting } from "../entities/tasting";
import { TastingRepository } from "../interfaces/repositories/tasting-repository";

export class TastingRepositoryImpl implements TastingRepository {
  tastingDataSource: TastingDataSource;

  constructor(tastingDataSource: TastingDataSource) {
    this.tastingDataSource = tastingDataSource;
  }

  async createTasting(tasting: Tasting): Promise<boolean> {
    const result = await this.tastingDataSource.create(tasting);
    return result;
  }

  async getTastings(): Promise<Tasting[]> {
    const result = await this.tastingDataSource.getAll();
    return result;
  }

}