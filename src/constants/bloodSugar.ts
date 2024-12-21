export const BLOOD_SUGAR_RANGES = {
  TARGET: {
    MIN: 80,
    MAX: 180
  },
  BEFORE_MEAL: {
    MIN: 80,
    MAX: 130
  },
  AFTER_MEAL: {
    MIN: 80,
    MAX: 180
  },
  BEDTIME: {
    MIN: 90,
    MAX: 150
  }
} as const;

export const BLOOD_SUGAR_CATEGORIES = {
  LOW: { min: 0, max: 70, label: 'Low', severity: 'danger' },
  TARGET: { min: 70, max: 180, label: 'Target', severity: 'success' },
  HIGH: { min: 180, max: 250, label: 'High', severity: 'warning' },
  VERY_HIGH: { min: 250, max: 400, label: 'Very High', severity: 'danger' }
} as const;

export const CHART_CONFIG = {
  MAX_VALUE: 400,
  MIN_VALUE: 0,
  HEIGHT: 200,
  VISIBLE_DAYS: 7
} as const;