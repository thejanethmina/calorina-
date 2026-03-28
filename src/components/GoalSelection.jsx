export default function GoalSelection({ goal, onChange }) {
  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5 shadow-lg">
      <h2 className="text-lg font-semibold">2) Goal Selection</h2>
      <p className="mb-4 text-sm text-slate-300">Choose your fitness target.</p>

      <div className="space-y-2 text-sm">
        <label className="flex items-start gap-2 rounded-md bg-slate-800 p-3">
          <input
            type="radio"
            value="fix_skinny_fat"
            checked={goal === 'fix_skinny_fat'}
            onChange={(e) => onChange(e.target.value)}
          />
          <span>
            <strong>Fix Skinny Fat</strong> (maintenance - 400 kcal, protein = 2 g/kg)
          </span>
        </label>

        <label className="flex items-start gap-2 rounded-md bg-slate-800 p-3">
          <input
            type="radio"
            value="maintain"
            checked={goal === 'maintain'}
            onChange={(e) => onChange(e.target.value)}
          />
          <span>
            <strong>Maintain</strong> (calories at maintenance, protein = 2 g/kg)
          </span>
        </label>
      </div>
    </section>
  );
}
