import { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import CharacterList from "../Components/CharacterList/CharacterList";
import "./App.css";
import CharacterDetail from "../Components/CharacterDetail/CharacterDetail";

function App() {
  return (
    <>
      <Navbar />
      <div className="character">
        <CharacterList />
        <CharacterDetail/>
      </div>
    </>
  );
}

export default App;
