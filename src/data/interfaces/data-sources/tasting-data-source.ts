import { TastingForm, Tasting } from "../../../domain/entities/tasting";

export interface TastingDataSource {
  create(tasting: TastingForm): Promise<boolean>;
  getAll(): Promise<Tasting[]>;
}