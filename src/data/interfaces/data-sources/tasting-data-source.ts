import { Tasting } from "../../../domain/entities/tasting";

export interface TastingDataSource {
  create(tasting: Tasting): Promise<boolean>;
  getAll(): Promise<Tasting[]>;
}