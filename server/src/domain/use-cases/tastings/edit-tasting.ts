import { TastingForm } from '../../entities/tasting';
import { TastingRepository } from '../../interfaces/repositories/tasting-repository';
import { EditTastingUseCase } from '../../interfaces/use-cases/edit-tasting';

export class EditTasting implements EditTastingUseCase {
  tastingRepository: TastingRepository;

  constructor(tastingRepository: TastingRepository) {
    this.tastingRepository = tastingRepository;
  }

  async execute(id: string, tasting: Partial<TastingForm>): Promise<boolean> {
    const result = await this.tastingRepository.editTasting(id, tasting);
    return result;
  }
}
