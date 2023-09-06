import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar, { Results, Heart } from "../Components/Navbar/Navbar";
import { Search } from "../Components/Navbar/Navbar";
import CharacterList from "../Components/CharacterList/CharacterList";
import "./App.css";
import axios from "axios";
import Modal from "../Components/Modal/Modal";
import CharacterDetail from "../Components/CharacterDetail/CharacterDetail";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [querry, setQuerry] = useState("");
  const [selectId, setSelectId] = useState(null);
  const [favoriteList, setFavoriteList] = useState(
    () => JSON.parse(localStorage.getItem("FAVORITES")) || []
  );

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
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/character",
          { signal }
        );
        const characters = data.results;
        const filterCharacters = characters.filter((character) =>
          character.name.toLowerCase().includes(querry)
        );
        // console.log(filterCharacters);
        setCharacters(filterCharacters);
        // setCharacters(data.results);
      } catch (err) {
        //if use fetch :
        // if(err.name!="AbortError"){
        // setCharacters([]);
        // toast.error(err.response.data.error);
        // }

        //if use axios
        // if(!axios.isCansel()){
        // setCharacters([]);
        // toast.error(err.response.data.error);
        // }
        console.log(err.name);
        setCharacters([]);
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [querry]);

  useEffect(() => {
    localStorage.setItem("FAVORITES", JSON.stringify(favoriteList));
  }, [favoriteList]);

  const selectCharacterHandler = (id) => {
    // console.log(selectId, id);
    if (selectId == id) {
      return setSelectId(null);
    }
    setSelectId(id);
  };

  const favoriteHandler = (character) => {
    const idFavorileList = favoriteList.map((item) => item.id);
    idFavorileList.includes(character.id)
      ? setFavoriteList(
          favoriteList.filter(
            (favoriteCharacter) => favoriteCharacter.id != character.id
          )
        )
      : setFavoriteList([...favoriteList, character]);
  };

  const isAddedToFavorite = favoriteList
    .map((fav) => fav.id)
    .includes(selectId);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Toaster />
      <Modal
        open={open}
        setOpen={setOpen}
        favoriteList={favoriteList}
        onRemoveFavoriteItem={favoriteHandler}
      />
      <Navbar>
        <Search querry={querry} setQuerry={setQuerry} />
        <Results numOfResults={characters.length} />
        <Heart
          numOfFavorite={favoriteList.length}
          open={open}
          setOpen={setOpen}
        />
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
