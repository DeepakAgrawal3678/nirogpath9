export interface RegionalDish {
  name: string;
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
  glycemicIndex: number;
  region: string;
  diabeticFriendly: boolean;
}

export interface RegionalCuisine {
  region: string;
  dishes: RegionalDish[];
}