import { Navigate, Route, Routes } from "react-router-dom";
import TelaInicio from "./views/TelaInicio";
import TelaServico from "./views/TelaServico";

function App() {
  return (
    <Routes>
      <Route path="/inicio" element={<TelaInicio />} />
      <Route path="/historico/:id" element={<TelaServico />} />
      <Route path="*" element={<Navigate to="/inicio" />} />
    </Routes>
  );
}

export default App;
