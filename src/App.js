import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Searchbar from "./Components/Searchbar";
import Pokemoncard from "./Components/Pokemoncard";
import Teamdisplay from "./Components/Teamdisplay";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Searchbar />
        <Routes>
          <Route path="/" element={<Pokemoncard />} />
          <Route path="/teamdisplay" element={<Teamdisplay />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;