import { Tasting } from '../../entities/tasting';
import { TastingRepository } from '../../interfaces/repositories/tasting-repository';
import { GetTastingsUseCase } from '../../interfaces/use-cases/get-tastings';

export class GetTastings implements GetTastingsUseCase {
  tastingRepository: TastingRepository;

  constructor(tastingRepository: TastingRepository) {
    this.tastingRepository = tastingRepository;
  }

  async execute(): Promise<Tasting[]> {
    const result = await this.tastingRepository.getTastings();
    return result;
  }
}
