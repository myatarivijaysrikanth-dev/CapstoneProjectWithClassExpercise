import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import OfflineBanner from "./components/OfflineBanner";

import Home from "./pages/Home";
import Workout from "./pages/Workout";
import Products from "./pages/Products";

import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />

        <OfflineBanner />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/workout" element={<Workout />} />

          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
