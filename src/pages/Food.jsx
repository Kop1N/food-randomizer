import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { getFoods } from "../utils/foodStorage";

function Food() {
  const { category } = useParams();
  const [result, setResult] = useState("Pick something");

  const pickFood = () => {
    const foods = getFoods(category);
    if (!foods || foods.length === 0) {
      setResult("No foods available for this category.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * foods.length);
    setResult(foods[randomIndex].name);
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