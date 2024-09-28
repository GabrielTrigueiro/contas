import { Navigate, Route, Routes } from "react-router-dom";
import PlaningScreen from "./views/PlaningScreen";
import CreatePlanning from "./views/CreatePlanning";

function App() {
  return (
    <Routes>
      <Route path="/planning" element={<PlaningScreen />} />
      <Route path="/create-planning" element={<CreatePlanning />} />
      <Route path="/view-planing/:id" element={<CreatePlanning />} />
      <Route path="*" element={<Navigate to="/planning" />} />
    </Routes>
  );
}

export default App;
