import Lounge from "./pages/lounge";
import Board from "./pages/board";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Lounge />} />
      <Route path="/game" element={<Board />} />
      <Route path="*" element={<Lounge />} />
    </Routes>
  );
}

export default App;
