import style from "./CharacterDetail.module.css";
import { episodes, character } from "../../data/data";

function CharacterDetail() {
  console.log();
  return (
    <div className={style.characterDetail}>

      <Character character={character} />
      <div className={style.CharacterDetail_episodes}>
        <div className={style.characterDetail_header}>
          <h3>List of Episodes</h3>
          <span className={style.characterDetail_info_count}>
            {episodes.length}
          </span>
        </div>
        {episodes.map((episode) => {
          return <EpisodesList episode={episode} key={episode.id} />;
        })}
      </div>
    </div>
  );
}

export default CharacterDetail;

function Character({character}) {
  return (
    <div className={style.CharacterDetail_desc}>
      <div className={style.CharacterDetail_desc_img}>
        <img src={character.image} />
      </div>
      <div className={style.CharacterDetail_desc_body}>
        <h2>{character.name}</h2>
        <div>
          <span className={style.CharacterDetail_desc_sign}></span>
          <span>{character.status}</span>
          <span>{character.species}</span>
        </div>
        <p className={style.CharacterDetail_desc_one}>{character.location.name}</p>
        <p className={style.CharacterDetail_desc_two}>{character.origin.name}</p>
        <button>Add to Favorite</button>
      </div>
    </div>
  );
}

function EpisodesList({ episode }) {
  return (
    <div className={style.characterDetail_info}>
      <div className={style.characterDetail_info_desc}>
        <h5>00 : {episode.episode} : </h5>
        <span>{episode.name}</span>
      </div>

      <button>{episode.air_date}</button>
    </div>
  );
}
