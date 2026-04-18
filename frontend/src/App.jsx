/* /frontend/src/App.jsx */

import { Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import RoomPage from "./pages/RoomPage";
import GamePage from "./pages/GamePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/room/:code" element={<RoomPage />} />
      <Route path="/game/:code" element={<GamePage />} />
    </Routes>
  );
}