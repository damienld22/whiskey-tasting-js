export type TastingScore = 1 | 2 | 3 | 4 | 5;

export type Tasting = {
  _id: string;
  score: TastingScore,
  drinkName: string;
  comment?: string;
}

export type TastingForm = Omit<Tasting, '_id'>;