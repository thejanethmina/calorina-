/**
 * Nutrition math utilities.
 */

/**
 * @typedef {'male' | 'female'} Gender
 */

/**
 * @typedef {'fix_skinny_fat' | 'maintain'} FitnessGoal
 */

/**
 * Mifflin-St Jeor BMR formula.
 * @param {{age:number, weightKg:number, heightCm:number, gender: Gender}} input
 * @returns {number}
 */
export function calculateBmr({ age, weightKg, heightCm, gender }) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
}

/**
 * Uses a light-activity multiplier for TDEE.
 * @param {number} bmr
 * @returns {number}
 */
export function calculateTdee(bmr) {
  return bmr * 1.375;
}

/**
 * Goal-based daily targets.
 * @param {{goal: FitnessGoal, maintenanceCalories:number, weightKg:number}} input
 */
export function calculateDailyTargets({ goal, maintenanceCalories, weightKg }) {
  const proteinGrams = 2 * weightKg;

  if (goal === 'fix_skinny_fat') {
    return {
      calories: Math.max(1200, maintenanceCalories - 400),
      proteinGrams
    };
  }

  return {
    calories: maintenanceCalories,
    proteinGrams
  };
}

/**
 * Equal per-meal split.
 * @param {{dailyCalories:number, dailyProteinGrams:number, meals:number}} input
 */
export function calculatePerMealTargets({ dailyCalories, dailyProteinGrams, meals }) {
  return {
    calories: dailyCalories / meals,
    proteinGrams: dailyProteinGrams / meals
  };
}

/**
 * Computes grams of food needed to satisfy both calorie and protein targets.
 * Picks the larger requirement so both constraints are met.
 * @param {{
 *  per100g: { calories:number, protein:number, carbs:number, fat:number },
 *  mealTarget: { calories:number, proteinGrams:number }
 * }} input
 */
export function calculateFoodGramsForMeal({ per100g, mealTarget }) {
  if (per100g.calories <= 0 || per100g.protein <= 0) {
    throw new Error('Selected food must have non-zero calories and protein values.');
  }

  const gramsFromCalories = (mealTarget.calories / per100g.calories) * 100;
  const gramsFromProtein = (mealTarget.proteinGrams / per100g.protein) * 100;
  const requiredGrams = Math.max(gramsFromCalories, gramsFromProtein);

  const factor = requiredGrams / 100;

  return {
    requiredGrams,
    metBy: gramsFromProtein >= gramsFromCalories ? 'protein' : 'calories',
    macrosForServing: {
      calories: per100g.calories * factor,
      protein: per100g.protein * factor,
      carbs: per100g.carbs * factor,
      fat: per100g.fat * factor
    }
  };
}
