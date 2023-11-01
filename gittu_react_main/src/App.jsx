import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeV1 from "./pages/HomeV1";
import HomeV2 from "./pages/HomeV2";
import HomeV3 from "./pages/HomeV3";
import HomeV4 from "./pages/HomeV4";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeV1 />} />
        <Route path="/home-two" element={<HomeV2 />} />
        <Route path="/home-three" element={<HomeV3 />} />
        <Route path="/home-four" element={<HomeV4 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
