import { allCharacters} from "../../data/data";
import { HiClipboard } from "react-icons/hi";
import Style from "./CharacterList.module.css";
function CharacterList() {
  return (
    <div className={Style.characterlist}>
      {allCharacters.map((character) => {
        return (
          <div className={Style.character}>
            <div className={Style.character_main}>
              <img src={character.image} />
              <div className={Style.character_desc}>
                <p className={Style.character_name}>{character.name}</p>
                <div className={Style.character_detail}>
                  <span className={Style.character_status_alive}></span>
                  <span className={Style.character_status}>{character.status} </span>
                  <span className={Style.character_species}> {character.species}</span>
                </div>
              </div>
            </div>
            <div className={Style.character_option}>
              <HiClipboard />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CharacterList;
