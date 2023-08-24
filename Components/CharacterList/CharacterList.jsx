import { HiClipboard } from "react-icons/hi";
import Style from "./CharacterList.module.css";
import Loader from "../Loader/Loader";
function CharacterList({ characters, isLoading, onSelectCharacter }) {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={Style.characterlist}>
      {characters.map((character) => {
        return (
          <Character
            character={character}
            key={character.id}
            onSelectCharacter={onSelectCharacter}
          />
        );
      })}
    </div>
  );
}

export default CharacterList;

function Character({ character, onSelectCharacter }) {
  return (
    <div
      className={Style.character}
      onClick={() => onSelectCharacter(character.id)}
    >
      <div className={Style.character_main}>
        <img src={character.image} />
        <div className={Style.character_desc}>
          <CharacterName character={character} />
          <CharacterInfo character={character} />
        </div>
      </div>
      <div className={Style.character_option}>
        <HiClipboard />
      </div>
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
