import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>🍴 Food Picker</h1>
      <div style={{ display: "grid", gap: "18px", maxWidth: "320px", margin: "0 auto" }}>
        <Link to="/addFood">
          <button type="button">Add new food</button>
        </Link>
        <Link to="/selectFood">
          <button type="button">Pick your meal</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
