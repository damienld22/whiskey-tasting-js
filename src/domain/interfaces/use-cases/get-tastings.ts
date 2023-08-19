import { Tasting } from "../../entities/tasting";

export interface GetTastingsUseCase {
  execute(): Promise<Tasting[]>;
}