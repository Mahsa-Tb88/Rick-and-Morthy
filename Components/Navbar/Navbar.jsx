import { HiOutlineHeart } from "react-icons/hi";
import Style from "./Navbar.module.css";
function Navbar({ children }) {
  return (
    <div className={Style.navbar}>
      <h3>
        <img src="./te829.jpg" />
        Logo
      </h3>
      {children}
    </div>
  );
}
export default Navbar;

export function Search({ querry, setQuerry }) {
  return (
    <div>
      <input
        type="text"
        placeholder="search..."
        onChange={(e) => setQuerry(e.target.value)}
        value={querry}
      />
    </div>
  );
}

export function Results({ numOfResults }) {
  return (
    <div>
      <div className={Style.navbar_result}>
        Fpound {numOfResults} Characters
      </div>
    </div>
  );
}

export function Heart({ numOfFavorite, open, setOpen }) {
  return (
    <div className={Style.navbar_heart} onClick={() => setOpen(true)}>
      <HiOutlineHeart />
      <span>{numOfFavorite}</span>
    </div>
  );
}
