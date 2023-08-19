import { Tasting } from "../../entities/tasting";

export interface CreateTastingUseCase {
  execute(tasting: Tasting): Promise<boolean>;
}