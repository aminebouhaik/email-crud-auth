import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Emails from "./pages/Emails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/emails"
        element={
          <ProtectedRoute>
            <Emails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
