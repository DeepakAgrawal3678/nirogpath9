import type { RegionalDish } from '../types';

export const PUNJABI_DISHES: RegionalDish[] = [
  {
    name: 'sarson ka saag',
    serving: '1 cup',
    calories: 180,
    protein: 8.4,
    carbs: 22.6,
    fat: 7.8,
    description: 'Mustard greens curry',
    glycemicIndex: 35,
    region: 'Punjab',
    diabeticFriendly: true
  },
  {
    name: 'dal makhani',
    serving: '1 cup',
    calories: 325,
    protein: 14.2,
    carbs: 42.6,
    fat: 12.4,
    description: 'Black lentils with butter and cream',
    glycemicIndex: 55,
    region: 'Punjab',
    diabeticFriendly: false
  },
  {
    name: 'rajma',
    serving: '1 cup',
    calories: 265,
    protein: 15.2,
    carbs: 45.4,
    fat: 2.8,
    description: 'Kidney beans curry',
    glycemicIndex: 45,
    region: 'Punjab',
    diabeticFriendly: true
  }
];