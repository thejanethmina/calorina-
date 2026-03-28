export default function UserProfileForm({ profile, onChange }) {
  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5 shadow-lg">
      <h2 className="text-lg font-semibold">1) User Profile</h2>
      <p className="mb-4 text-sm text-slate-300">Enter age, weight, height, and gender.</p>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm">
          Age
          <input
            className="mt-1 w-full rounded-md bg-slate-800 p-2"
            type="number"
            min="10"
            value={profile.age}
            onChange={(e) => onChange('age', Number(e.target.value))}
          />
        </label>

        <label className="text-sm">
          Weight (kg)
          <input
            className="mt-1 w-full rounded-md bg-slate-800 p-2"
            type="number"
            step="0.1"
            min="20"
            value={profile.weightKg}
            onChange={(e) => onChange('weightKg', Number(e.target.value))}
          />
        </label>

        <label className="text-sm">
          Height (cm)
          <input
            className="mt-1 w-full rounded-md bg-slate-800 p-2"
            type="number"
            min="100"
            value={profile.heightCm}
            onChange={(e) => onChange('heightCm', Number(e.target.value))}
          />
        </label>

        <label className="text-sm">
          Gender
          <select
            className="mt-1 w-full rounded-md bg-slate-800 p-2"
            value={profile.gender}
            onChange={(e) => onChange('gender', e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
      </div>
    </section>
  );
}
