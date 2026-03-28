const USDA_API_BASE = 'https://api.nal.usda.gov/fdc/v1';

/**
 * Finds a food and returns nutrition values per 100g.
 * @param {string} query
 */
export async function searchFoodByName(query) {
  const apiKey = import.meta.env.VITE_USDA_API_KEY;

  if (!apiKey) {
    throw new Error('Missing USDA API key. Add VITE_USDA_API_KEY to your environment.');
  }

  const url = `${USDA_API_BASE}/foods/search?api_key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      pageSize: 1,
      dataType: ['Foundation', 'SR Legacy', 'Survey (FNDDS)']
    })
  });

  if (!response.ok) {
    throw new Error('Unable to reach USDA FoodData Central right now.');
  }

  const data = await response.json();
  const food = data?.foods?.[0];

  if (!food) {
    throw new Error('No food found for that search term.');
  }

  const nutrients = Object.fromEntries(
    (food.foodNutrients || []).map((n) => [n.nutrientName, n.value])
  );

  return {
    description: food.description,
    per100g: {
      calories: nutrients['Energy'] || nutrients['Energy (Atwater General Factors)'] || 0,
      protein: nutrients['Protein'] || 0,
      carbs: nutrients['Carbohydrate, by difference'] || 0,
      fat: nutrients['Total lipid (fat)'] || 0
    }
  };
}
