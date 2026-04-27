import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addFood, deleteFood, getCategories, getFoods, updateFood } from "../utils/foodStorage";

const categories = getCategories();

function AddFood() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryFoods, setCategoryFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [foodCost, setFoodCost] = useState("");
  const [message, setMessage] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryFoods(getFoods(selectedCategory));
    } else {
      setCategoryFoods([]);
    }
    setEditingIndex(null);
    setFoodName("");
    setFoodCost("");
    setMessage("");
  }, [selectedCategory]);

  const refreshFoods = () => {
    setCategoryFoods(getFoods(selectedCategory));
  };

  const startEdit = (index) => {
    const item = categoryFoods[index];
    setEditingIndex(index);
    setFoodName(item.name);
    setFoodCost(String(item.price));
    setMessage("Editing the selected item. Update values and save.");
  };

  const handleDelete = (index) => {
    if (!selectedCategory) return;
    deleteFood(selectedCategory, index);
    refreshFoods();
    setMessage("Food item deleted.");
    if (editingIndex === index) {
      setEditingIndex(null);
      setFoodName("");
      setFoodCost("");
    }
  };

  const handleUpdateRow = (index) => {
    if (!selectedCategory) return;
    if (!foodName.trim() || !foodCost.trim()) {
      setMessage("Enter both food name and cost before updating.");
      return;
    }

    updateFood(selectedCategory, index, foodName.trim(), foodCost);
    refreshFoods();
    setMessage(`Updated ${foodName.trim()} in ${selectedCategory}.`);
    setEditingIndex(null);
    setFoodName("");
    setFoodCost("");
  };

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

    if (editingIndex === null) {
      addFood(selectedCategory, foodName.trim(), foodCost);
      setMessage(
        `Added ${foodName.trim()} to ${selectedCategory} for ₱${parseFloat(foodCost).toFixed(2)}.`
      );
    } else {
      updateFood(selectedCategory, editingIndex, foodName.trim(), foodCost);
      setMessage(`Updated ${foodName.trim()} in ${selectedCategory}.`);
    }

    setFoodName("");
    setFoodCost("");
    setEditingIndex(null);
    refreshFoods();
  };

  return (
    <div>
      <h1>🍴 Add Food</h1>
      <p style={{ margin: "0 auto 24px", maxWidth: 520 }}>
        Choose a meal category, then add or edit food items with prices in pesos.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "24px" }}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
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
        <div style={{ width: "100%", maxWidth: 520, margin: "0 auto" }}>
          <h2 style={{ marginBottom: 16 }}>Selected: {selectedCategory}</h2>

          {categoryFoods.length > 0 && (
            <div style={{ display: "grid", gap: "10px", marginBottom: 20 }}>
              {categoryFoods.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 16,
                    background: "rgba(246, 247, 250, 0.95)",
                    border: "1px solid rgba(209, 213, 219, 0.8)",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    gap: "10px"
                  }}
                >
                  <div>
                    <strong>{item.name}</strong>
                    <div style={{ color: "#6b7280" }}>₱{item.price.toFixed(2)}</div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {editingIndex === index ? (
                      <>
                        <button type="button" disabled style={{ padding: "10px 14px", opacity: 0.6 }}>
                          Edit
                        </button>
                        <button type="button" onClick={() => handleUpdateRow(index)} style={{ padding: "10px 14px" }}>
                          Update
                        </button>
                        <button type="button" onClick={() => handleDelete(index)} style={{ padding: "10px 14px" }}>
                          Delete
                        </button>
                      </>
                    ) : (
                      <button type="button" onClick={() => startEdit(index)} style={{ padding: "10px 14px" }}>
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

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
            <button type="submit">{editingIndex === null ? "Save food" : "Update food"}</button>
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