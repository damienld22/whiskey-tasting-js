import { TastingRepository } from '../../interfaces/repositories/tasting-repository';
import { DeleteTastingUseCase } from '../../interfaces/use-cases/delete-tasting';

export class DeleteTasting implements DeleteTastingUseCase {
  tastingRepository: TastingRepository;

  constructor(tastingRepository: TastingRepository) {
    this.tastingRepository = tastingRepository;
  }

  async execute(id: string): Promise<boolean> {
    const result = await this.tastingRepository.deleteTasting(id);
    return result;
  }
}
