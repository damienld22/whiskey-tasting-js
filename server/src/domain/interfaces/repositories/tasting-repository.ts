import { TastingForm, Tasting } from '../../entities/tasting';

export interface TastingRepository {
  createTasting(tasting: TastingForm): Promise<boolean>;
  getTastings(): Promise<Tasting[]>;
  editTasting(id: string, tasting: Partial<TastingForm>): Promise<boolean>;
  deleteTasting(id: string): Promise<boolean>;
}
