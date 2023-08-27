import { useEffect, useState } from "react";
import { allCharacters, character } from "../data/data";
import toast, { Toaster } from "react-hot-toast";
import Navbar, { Results, Heart } from "../Components/Navbar/Navbar";
import { Search } from "../Components/Navbar/Navbar";
import CharacterList from "../Components/CharacterList/CharacterList";
import "./App.css";
import axios from "axios";
import CharacterDetail from "../Components/CharacterDetail/CharacterDetail";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [querry, setQuerry] = useState("");
  const [selectId, setSelectId] = useState(null);
  const [favoriteList, setFavoriteList] = useState([]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/characters")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("something has wrong Mahsa!");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setCharacters(data.results.slice(0, 5));
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       toast.error(err.message);
  //       // toast.error(err.response.data.message);
  //       // toast.error(err.request.data.message);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch("https://rickandmortyapi.com/api/characters");
  //       if (!res.ok) throw new Error("somethin went wrong");
  //       const data = await res.json();
  //       setCharacters(data.results.slice(0, 5));
  //     } catch (err) {
  //       toast.error(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get("https://rickandmortyapi.com/api/characters")
  //     .then((res) => {
  //       setCharacters(res.data.results.slice(0, 5));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(err.response.data.error);
  //       // toast.error(err.response.data.message);
  //       // toast.error(err.request.data.message);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        const characters = data.results;
        const filterCharacters = characters.filter((character) =>
          character.name.toLowerCase().includes(querry)
        );
        // console.log(filterCharacters);
        setCharacters(filterCharacters);
        // setCharacters(data.results);
      } catch (err) {
        console.log(err.response.data.error);
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [querry]);

  const selectCharacterHandler = (id) => {
    console.log(selectId, id);
    if (selectId == id) {
      return setSelectId(null);
    }
    setSelectId(id);
  };

  const favoriteHandler = (character) => {
    favoriteList.indexOf(character) == -1
      ? setFavoriteList([...favoriteList, character])
      : setFavoriteList(
          favoriteList.filter(
            (favoriteCharacter) => favoriteCharacter != character
          )
        );
  
  };
  const isAddedToFavorite = favoriteList.map((fav) => fav.id).includes(selectId);
  return (
    <div>
      <Toaster />
      <Navbar>
        <Search querry={querry} setQuerry={setQuerry} />
        <Results numOfResults={characters.length} />
        <Heart numOfFavorite={favoriteList.length} />
      </Navbar>
      <Main>
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={selectCharacterHandler}
          selectId={selectId}
        />
        <CharacterDetail
          selectId={selectId}
          favoriteHandler={favoriteHandler}
          isAddedToFavorite={isAddedToFavorite}
        />
      </Main>
    </div>
  );
}

export default App;
function Main({ children }) {
  return <div className="character">{children}</div>;
}
