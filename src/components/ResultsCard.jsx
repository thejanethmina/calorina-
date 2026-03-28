const format = (num) => num.toFixed(1);

export default function ResultsCard({ summary, mealTarget, foodResult }) {
  return (
    <section className="rounded-xl border border-emerald-700 bg-slate-900/70 p-5 shadow-lg">
      <h2 className="text-lg font-semibold">5) Nutrition Math Engine Results</h2>

      <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
        <p>Maintenance (TDEE): <strong>{format(summary.tdee)} kcal</strong></p>
        <p>Daily Calories: <strong>{format(summary.dailyCalories)} kcal</strong></p>
        <p>Daily Protein: <strong>{format(summary.dailyProtein)} g</strong></p>
        <p>Per-Meal Target: <strong>{format(mealTarget.calories)} kcal / {format(mealTarget.proteinGrams)} g protein</strong></p>
      </div>

      <hr className="my-4 border-slate-700" />

      <p className="text-sm text-slate-300">
        Food selected: <strong>{foodResult.description}</strong>
      </p>
      <p className="mt-2 text-base">
        Required amount for one meal: <strong className="text-emerald-400">{format(foodResult.requiredGrams)} g</strong>
      </p>
      <p className="text-xs text-slate-400">Constraint met by: {foodResult.metBy}</p>

      <div className="mt-3 grid gap-2 rounded-md bg-slate-800 p-3 text-sm md:grid-cols-2">
        <p>Calories: <strong>{format(foodResult.macrosForServing.calories)} kcal</strong></p>
        <p>Protein: <strong>{format(foodResult.macrosForServing.protein)} g</strong></p>
        <p>Carbs: <strong>{format(foodResult.macrosForServing.carbs)} g</strong></p>
        <p>Fat: <strong>{format(foodResult.macrosForServing.fat)} g</strong></p>
      </div>
    </section>
  );
}
