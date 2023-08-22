import { TastingForm } from '../../entities/tasting';

export interface CreateTastingUseCase {
  execute(tasting: TastingForm): Promise<boolean>;
}
