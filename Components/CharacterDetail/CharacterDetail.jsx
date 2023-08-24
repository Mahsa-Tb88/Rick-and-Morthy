import style from "./CharacterDetail.module.css";
import { episodes } from "../../data/data";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";

function CharacterDetail({ selectId }) {
  console.log(selectId);
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectId}`
        );
        setCharacter(data);
        // console.log(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        // setIsLoading(false);
      }
    }

    if (selectId) fetchData();
  }, [selectId]);

  if (isLoading) {
    return (
      <div className={style.CharacterDetail_comment}>
        <Loader />
      </div>
    );
  }
  if (!character || !selectId)
    return (
      <div className={style.CharacterDetail_comment}>
        Please select Character
      </div>
    );

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
        {episodes.map((episode, index) => {
          return (
            <EpisodesList episode={episode} key={episode.id} index={index} />
          );
        })}
      </div>
    </div>
  );
}

export default CharacterDetail;

function Character({ character }) {
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
        <p className={style.CharacterDetail_desc_one}>
          {character.location.name}
        </p>
        <p className={style.CharacterDetail_desc_two}>
          {character.origin.name}
        </p>
        <button>Add to Favorite</button>
      </div>
    </div>
  );
}

function EpisodesList({ episode, index }) {
  return (
    <div className={style.characterDetail_info}>
      <div className={style.characterDetail_info_desc}>
        <h5>
          {String(index + 1).padStart(2, "0")} : {episode.episode} :{" "}
        </h5>
        <span>{episode.name}</span>
      </div>

      <span className={style.characterDetail_info_badge}>
        {episode.air_date}
      </span>
    </div>
  );
}
