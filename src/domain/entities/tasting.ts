export type TastingScore = 1 | 2 | 3 | 4 | 5;

export type Tasting = {
  id: string;
  score: TastingScore,
  drinkName: string;
  comment?: string;
}