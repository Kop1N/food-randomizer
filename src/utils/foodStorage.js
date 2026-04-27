const STORAGE_KEY = "foodRandomizerData";

const DEFAULT_FOODS = {
  breakfast: [
    { name: "Tapsilog", price: 120 },
    { name: "Pandesal", price: 25 },
    { name: "Omelette", price: 80 }
  ],
  lunch: [
    { name: "Adobo", price: 150 },
    { name: "Sinigang", price: 180 },
    { name: "Pancit", price: 140 }
  ],
  dinner: [
    { name: "Steak", price: 420 },
    { name: "Fried Chicken", price: 220 },
    { name: "Sisig", price: 200 }
  ],
  snack: [
    { name: "Fries", price: 100 },
    { name: "Burger", price: 160 },
    { name: "Milk Tea", price: 110 }
  ],
  whatever: [
    { name: "Pizza", price: 320 },
    { name: "Ramen", price: 250 },
    { name: "Jollibee", price: 180 }
  ]
};

function readStorage() {
  if (typeof window === "undefined") {
    return DEFAULT_FOODS;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_FOODS;
    }
    const parsed = JSON.parse(raw);
    return {
      breakfast: parsed.breakfast || DEFAULT_FOODS.breakfast,
      lunch: parsed.lunch || DEFAULT_FOODS.lunch,
      dinner: parsed.dinner || DEFAULT_FOODS.dinner,
      snack: parsed.snack || DEFAULT_FOODS.snack,
      whatever: parsed.whatever || DEFAULT_FOODS.whatever
    };
  } catch (error) {
    console.warn("Failed to read saved food data", error);
    return DEFAULT_FOODS;
  }
}

function writeStorage(data) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to save food data", error);
  }
}

export function getFoods(category) {
  const store = readStorage();
  return category ? store[category] || [] : store;
}

export function getCategories() {
  return Object.keys(DEFAULT_FOODS);
}

export function addFood(category, name, price) {
  const normalizedCategory = category?.toLowerCase();
  if (!normalizedCategory || !DEFAULT_FOODS[normalizedCategory]) {
    throw new Error("Invalid category");
  }

  const foods = readStorage();
  const nextPrice = typeof price === "string" ? parseFloat(price) : price;
  const newItem = {
    name: name.trim(),
    price: Number.isNaN(nextPrice) ? 0 : Number(nextPrice)
  };

  const updated = {
    ...foods,
    [normalizedCategory]: [newItem, ...(foods[normalizedCategory] || [])]
  };

  writeStorage(updated);
  return updated;
}
