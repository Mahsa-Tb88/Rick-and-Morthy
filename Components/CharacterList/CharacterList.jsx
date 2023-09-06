import { HiClipboard } from "react-icons/hi";
import { HiClipboardList } from "react-icons/hi";
import Style from "./CharacterList.module.css";
import Loader from "../Loader/Loader";
import { Children } from "react";
function CharacterList({ characters, isLoading, onSelectCharacter, selectId }) {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={Style.characterlist}>
      {characters.map((character) => {
        return (
          <Character character={character} key={character.id}>
            <button
              onClick={() => onSelectCharacter(character.id)}
              className={`${Style.character_btn} , ${
                selectId == character.id ? Style.character_btn_selected : ""
              }`}
            >
              {selectId == character.id ? <HiClipboardList /> : <HiClipboard />}
            </button>
          </Character>
        );
      })}
    </div>
  );
}

export default CharacterList;

export function Character({ character, children }) {
  return (
    <div className={Style.character}>
      <div className={Style.character_main}>
        <img src={character.image} />
        <div className={Style.character_desc}>
          <CharacterName character={character} />
          <CharacterInfo character={character} />
        </div>
      </div>
      {children}
    </div>
  );
}

function CharacterName({ character }) {
  return (
    <div>
      <p className={Style.character_name}>{character.name}</p>
    </div>
  );
}

function CharacterInfo({ character }) {
  return (
    <div className={Style.character_info}>
      <span
        className={
          character.status == "Alive"
            ? Style.character_status_alive
            : Style.character_status_dead
        }
      ></span>
      <span className={Style.character_status}>{character.status} </span>
      <span className={Style.character_species}> {character.species}</span>
    </div>
  );
}
