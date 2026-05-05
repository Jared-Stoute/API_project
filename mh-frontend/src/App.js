import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import MonstersPage from "./pages/MonstersPage";
import BuildsPage from "./pages/BuildsPage";

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/monsters" element={<MonstersPage />} />
          <Route path="/builds" element={<BuildsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;