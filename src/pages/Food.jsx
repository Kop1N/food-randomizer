import { useParams, Link } from "react-router-dom";
import { useState } from "react";

const foodData = {
  breakfast: ["Tapsilog", "Pandesal", "Omelette"],
  lunch: ["Adobo", "Sinigang", "Pancit"],
  dinner: ["Steak", "Fried Chicken", "Sisig"],
  snack: ["Fries", "Burger", "Milk Tea"],
  whatever: ["Pizza", "Ramen", "Jollibee"]
};

function Food() {
  const { category } = useParams();
  const [result, setResult] = useState("Pick something");

  const pickFood = () => {
    const foods = foodData[category];
    const randomIndex = Math.floor(Math.random() * foods.length);
    setResult(foods[randomIndex]);
  };

  return (
    <div>
      <h1>{category?.toUpperCase()}</h1>

      <h2>{result}</h2>

      <button onClick={pickFood}>Pick Food</button>

      <br /><br />
      <Link to="/"><button>⬅ Back</button></Link>
    </div>
  );
}

export default Food;