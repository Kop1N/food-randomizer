import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddFood from "./pages/addFood";
import SelectFood from "./pages/selectFood";
import Food from "./pages/Food";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addFood" element={<AddFood />} />
      <Route path="/selectFood" element={<SelectFood />} />
      <Route path="/food/:category" element={<Food />} />
    </Routes>
  );
}

export default App;

