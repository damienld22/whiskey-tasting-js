import { TastingForm, Tasting } from '../../entities/tasting';

export interface TastingRepository {
  createTasting(tasting: TastingForm): Promise<boolean>;
  getTastings(): Promise<Tasting[]>;
}
