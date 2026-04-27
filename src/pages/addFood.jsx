import { useState } from "react";
import { Link } from "react-router-dom";
import { addFood, getCategories } from "../utils/foodStorage";

const categories = getCategories();

function AddFood() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodCost, setFoodCost] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedCategory) {
      setMessage("Please choose a meal category first.");
      return;
    }

    if (!foodName.trim() || !foodCost.trim()) {
      setMessage("Enter both food name and cost before saving.");
      return;
    }

    addFood(selectedCategory, foodName.trim(), foodCost);
    setMessage(
      `Added ${foodName.trim()} to ${selectedCategory} for ₱${parseFloat(foodCost).toFixed(2)}.`
    );
    setFoodName("");
    setFoodCost("");
  };

  return (
    <div>
      <h1>🍴 Add Food</h1>
      <p style={{ margin: "0 auto 24px", maxWidth: 520 }}>
        Choose the meal category, then add the food name and cost in pesos.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "24px" }}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setSelectedCategory(category);
              setMessage("");
            }}
            style={{
              minWidth: 120,
              opacity: selectedCategory === category ? 1 : 0.8,
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div style={{ width: "100%", maxWidth: 440, margin: "0 auto" }}>
          <h2 style={{ marginBottom: 16 }}>Selected: {selectedCategory}</h2>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
            <input
              value={foodName}
              onChange={(event) => setFoodName(event.target.value)}
              placeholder="Food name"
              style={{ padding: "14px 16px", borderRadius: 14, border: "1px solid #d1d5db" }}
            />
            <input
              value={foodCost}
              onChange={(event) => setFoodCost(event.target.value)}
              placeholder="Cost in pesos"
              type="number"
              min="0"
              step="0.01"
              style={{ padding: "14px 16px", borderRadius: 14, border: "1px solid #d1d5db" }}
            />
            <button type="submit">Save food</button>
          </form>
        </div>
      )}

      {message && <p style={{ marginTop: 24, fontWeight: 600 }}>{message}</p>}

      <div style={{ marginTop: 36 }}>
        <Link to="/">
          <button type="button">⬅ Back to home</button>
        </Link>
      </div>
    </div>
  );
}

export default AddFood;