import { TastingForm } from '../../entities/tasting';

export interface EditTastingUseCase {
  execute(id: string, tasting: Partial<TastingForm>): Promise<boolean>;
}
