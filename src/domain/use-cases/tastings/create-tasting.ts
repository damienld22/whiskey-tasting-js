import { Tasting } from "../../entities/tasting";
import { TastingRepository } from "../../interfaces/repositories/tasting-repository";
import { CreateTastingUseCase } from "../../interfaces/use-cases/create-tasting";

export class CreateTasting implements CreateTastingUseCase {
  tastingRepository: TastingRepository;

  constructor(tastingRepository: TastingRepository) {
    this.tastingRepository = tastingRepository;
  }

  async execute(tasting: Tasting): Promise<boolean> {
    const result = await this.tastingRepository.createTasting(tasting);
    return result;
  }
}