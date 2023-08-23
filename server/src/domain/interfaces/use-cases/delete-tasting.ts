export interface DeleteTastingUseCase {
  execute(id: string): Promise<boolean>;
}
