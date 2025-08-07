import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar.";
import Results from "./pages/Results";
import ElectionDetails from "./pages/ElectionDetails";
import Elections from "./pages/Election";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/elections" element={<Elections />} />
        <Route path="/elections/:id" element={<ElectionDetails />} />
        <Route path="/results/:id" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App