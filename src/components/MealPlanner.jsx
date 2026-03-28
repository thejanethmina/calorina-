export default function MealPlanner({ meals, onChange }) {
  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5 shadow-lg">
      <h2 className="text-lg font-semibold">3) Meal Division</h2>
      <p className="mb-4 text-sm text-slate-300">How many meals will you eat today?</p>
      <input
        className="w-40 rounded-md bg-slate-800 p-2"
        type="number"
        min="1"
        max="12"
        value={meals}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </section>
  );
}
