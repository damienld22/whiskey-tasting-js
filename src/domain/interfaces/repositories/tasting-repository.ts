import { Tasting } from "../../entities/tasting";

export interface TastingRepository {
  createTasting(tasting: Tasting): Promise<boolean>;
  getTastings(): Promise<Tasting[]>;
}