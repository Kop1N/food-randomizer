import { useState } from "react";
import { Link } from "react-router-dom";
import pickSound from "../assets/random.mp3";
import { getCategories, getFoods } from "../utils/foodStorage";

const categories = getCategories();

function SelectFood() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [isPicking, setIsPicking] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [message, setMessage] = useState("");

  const handleChoose = (category) => {
    setSelectedCategory(category);
    setSelectedFood(null);
    setHighlightIndex(null);
    setIsPicking(false);
    setMessage("");
  };

  const pickRandomFood = () => {
    if (!selectedCategory || isPicking) return;

    const audio = new Audio(pickSound);
    audio.volume = 0.6;
    audio.play().catch(() => {
      // ignore autoplay issues if browser blocks sound
    });

    const choices = getFoods(selectedCategory);
    setIsPicking(true);
    setSelectedFood(null);
    setMessage("Selecting a meal...");

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      setHighlightIndex(randomIndex);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const randomIndex = Math.floor(Math.random() * choices.length);
      setHighlightIndex(randomIndex);
      setSelectedFood(choices[randomIndex]);
      setIsPicking(false);
      setMessage(`Try ${choices[randomIndex].name} — estimated cost ₱${choices[randomIndex].price.toFixed(2)}.`);
    }, 1400);
  };

  return (
    <div>
      <h1>🍽️ Pick Your Meal</h1>
      <p style={{ margin: "0 auto 24px", maxWidth: 520 }}>
        Choose a meal category to see sample dishes with assumed costs in pesos.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "24px" }}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            style={{ minWidth: 120, opacity: selectedCategory === category ? 1 : 0.8 }}
            onClick={() => handleChoose(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {selectedCategory ? (
        <div style={{ width: "100%", maxWidth: 520, margin: "0 auto" }}>
          <h2 style={{ marginBottom: 16 }}>
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} options
          </h2>
          <div style={{ display: "grid", gap: "10px", marginBottom: 20 }}>
            {getFoods(selectedCategory).map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                style={{
                  padding: "14px 16px",
                  borderRadius: 16,
                  background: highlightIndex === index ? "rgba(170, 59, 255, 0.18)" : "rgba(246, 247, 250, 0.9)",
                  border: highlightIndex === index ? "2px solid rgba(170, 59, 255, 0.35)" : "1px solid rgba(209, 213, 219, 0.8)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "background 0.2s ease, border 0.2s ease"
                }}
              >
                <span>{item.name}</span>
                <span style={{ fontWeight: 700 }}>₱{item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <button type="button" onClick={pickRandomFood} disabled={isPicking}>
            {isPicking ? "Picking..." : "Pick a random meal"}
          </button>

          {message && (
            <p style={{ marginTop: 18, fontWeight: 600 }}>{message}</p>
          )}
        </div>
      ) : (
        <p style={{ marginTop: 12 }}>Select a category to view sample dishes and prices.</p>
      )}

      <div style={{ marginTop: 36 }}>
        <Link to="/">
          <button type="button">⬅ Back to home</button>
        </Link>
      </div>
    </div>
  );
}

export default SelectFood;