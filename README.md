# Smart Nutrition & Body Composition Calculator

A React + Tailwind CSS web app that:

- Profiles the user (age, weight, height, gender)
- Calculates TDEE using Mifflin-St Jeor + light activity multiplier (1.375)
- Supports a primary **Fix Skinny Fat** goal (`maintenance - 400 kcal` and `2 g protein / kg body weight`)
- Splits daily calories/protein across user-defined meals
- Fetches real food data from USDA FoodData Central
- Calculates exact grams of a selected food needed for one meal target

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment template and set your USDA API key:
   ```bash
   cp .env.example .env
   ```
3. Run development server:
   ```bash
   npm run dev
   ```

## API key

Get a free USDA FoodData Central API key from:
https://fdc.nal.usda.gov/api-key-signup.html

Set it as `VITE_USDA_API_KEY` in `.env`.
