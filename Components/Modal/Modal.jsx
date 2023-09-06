import { character } from "../../data/data";
import { Character } from "../CharacterList/CharacterList";
import style from "./Modal.module.css";
import { HiX } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
function Modal({ open, setOpen, favoriteList, onRemoveFavoriteItem }) {
  if (!open) return;
  {
    // console.log(favoriteList);
  }
  return (
    <div>
      <div className={style.backdrop}></div>
      <div className={style.favorit_content}>
        <div className={style.header}>
          <h2>List of Favorite</h2>
          <span className={style.icon} onClick={() => setOpen(false)}>
            <HiX className={style.close_icon} />
          </span>
        </div>
        <div className={style.favorite_body}>
          {favoriteList.map((item) => {
            return (
              <Character character={item} key={item.id}>
                <button
                  className={style.icon_trash}
                  onClick={() => onRemoveFavoriteItem(item)}
                >
                  <HiOutlineTrash />
                </button>
              </Character>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Modal;
