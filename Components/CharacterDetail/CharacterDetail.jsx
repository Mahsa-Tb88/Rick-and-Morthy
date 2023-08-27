import style from "./CharacterDetail.module.css";
import { episodes } from "../../data/data";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function CharacterDetail({ selectId, favoriteHandler, isAddedToFavorite }) {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpidodes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectId}`
        );
        setCharacter(data);

        //getting number of episodes that each character played
        const episodesCharacter = data.episode;
        const episodesId = episodesCharacter.map((e) => {
          return e.split("/").at(-1);
        });
        const selectEpisodes = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        const allEpisodesOfCharacter = selectEpisodes.data;
        // const newAllEpisodesOfCharacter = [];
        // if (!Array.isArray(allEpisodesOfCharacter)) {
        //   newAllEpisodesOfCharacter.push(allEpisodesOfCharacter);
        //   allEpisodesOfCharacter = newAllEpisodesOfCharacter;
        // }
        setEpidodes([allEpisodesOfCharacter].flat());
      } catch (err) {
        toast.error(err.response.data.error);
        console.log(err.response);
      } finally {
        setIsLoading(false);
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
      <Character
        character={character}
        onAddFavorite={favoriteHandler}
        isAddedToFavorite={isAddedToFavorite}
      />
      <div className={style.CharacterDetail_episodes}>
        <div className={style.characterDetail_header}>
          <h3>List of Episodes</h3>
          <span className={style.characterDetail_info_count}>
            {episodes.length}
          </span>
        </div>
        <div className={style.episodeList}>
          {episodes.map((episode, index) => {
            return <Episode episode={episode} key={episode.id} index={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;

function Character({ character, onAddFavorite, isAddedToFavorite }) {
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
        <button onClick={() => onAddFavorite(character)}>
          {isAddedToFavorite ? "Remove favorite" : "Add to Favorite"}
        </button>
      </div>
    </div>
  );
}

function Episode({ episode, index }) {
  return (
    <div className={style.characterDetail_info}>
      <div className={style.characterDetail_info_desc}>
        <h5>
          {String(index + 1).padStart(2, "0")} - {episode.episode}
        </h5>
        <span>{episode.name}</span>
      </div>

      <span className={style.characterDetail_info_badge}>
        {episode.air_date}
      </span>
    </div>
  );
}
