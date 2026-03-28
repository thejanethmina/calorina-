import { useState } from 'react';

export default function FoodSearchForm({ onSearch, loading }) {
  const [foodName, setFoodName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!foodName.trim()) return;
    onSearch(foodName.trim());
  };

  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5 shadow-lg">
      <h2 className="text-lg font-semibold">4) Food Input</h2>
      <p className="mb-4 text-sm text-slate-300">Search a food to fetch nutrition data per 100g.</p>

      <form className="flex flex-col gap-2 md:flex-row" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-md bg-slate-800 p-2"
          type="text"
          value={foodName}
          placeholder="e.g., chicken breast"
          onChange={(e) => setFoodName(e.target.value)}
        />
        <button
          className="rounded-md bg-emerald-500 px-4 py-2 font-medium text-slate-950 hover:bg-emerald-400 disabled:opacity-70"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Calculate'}
        </button>
      </form>
    </section>
  );
}
