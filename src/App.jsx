import { useMemo, useState } from 'react';
import UserProfileForm from './components/UserProfileForm';
import GoalSelection from './components/GoalSelection';
import MealPlanner from './components/MealPlanner';
import FoodSearchForm from './components/FoodSearchForm';
import ResultsCard from './components/ResultsCard';
import { searchFoodByName } from './api/usda';
import {
  calculateBmr,
  calculateDailyTargets,
  calculateFoodGramsForMeal,
  calculatePerMealTargets,
  calculateTdee
} from './utils/calculations';

export default function App() {
  const [profile, setProfile] = useState({
    age: 28,
    weightKg: 70,
    heightCm: 175,
    gender: 'male'
  });
  const [goal, setGoal] = useState('fix_skinny_fat');
  const [meals, setMeals] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const computed = useMemo(() => {
    const bmr = calculateBmr(profile);
    const tdee = calculateTdee(bmr);
    const daily = calculateDailyTargets({
      goal,
      maintenanceCalories: tdee,
      weightKg: profile.weightKg
    });
    const meal = calculatePerMealTargets({
      dailyCalories: daily.calories,
      dailyProteinGrams: daily.proteinGrams,
      meals: Math.max(1, meals)
    });

    return {
      tdee,
      daily,
      meal
    };
  }, [profile, goal, meals]);

  const handleProfileChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleFoodSearch = async (foodName) => {
    setLoading(true);
    setError('');

    try {
      const food = await searchFoodByName(foodName);
      const foodMath = calculateFoodGramsForMeal({
        per100g: food.per100g,
        mealTarget: computed.meal
      });

      setResults({
        summary: {
          tdee: computed.tdee,
          dailyCalories: computed.daily.calories,
          dailyProtein: computed.daily.proteinGrams
        },
        mealTarget: computed.meal,
        foodResult: {
          description: food.description,
          ...foodMath
        }
      });
    } catch (err) {
      setResults(null);
      setError(err.message || 'Unexpected error while calculating food grams.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl space-y-4 px-4 py-8">
      <header className="mb-2">
        <h1 className="text-2xl font-bold text-emerald-400">Smart Nutrition & Body Composition Calculator</h1>
        <p className="text-sm text-slate-300">
          Uses Mifflin-St Jeor + USDA FoodData Central to compute exact grams per meal.
        </p>
      </header>

      <UserProfileForm profile={profile} onChange={handleProfileChange} />
      <GoalSelection goal={goal} onChange={setGoal} />
      <MealPlanner meals={meals} onChange={setMeals} />
      <FoodSearchForm onSearch={handleFoodSearch} loading={loading} />

      {error && <div className="rounded-md border border-red-700 bg-red-950/40 p-3 text-sm text-red-300">{error}</div>}

      {results && (
        <ResultsCard
          summary={results.summary}
          mealTarget={results.mealTarget}
          foodResult={results.foodResult}
        />
      )}
    </main>
  );
}
