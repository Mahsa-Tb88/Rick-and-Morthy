import { HiOutlineHeart } from "react-icons/hi";
import Style from "./Navbar.module.css";
import { useState } from "react";
function Navbar({ children }) {
  return (
    <div className={Style.navbar}>
      <h3>Loogo</h3>
      {children}
      <Heart />
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

function Heart() {
  return (
    <div className={Style.navbar_heart}>
      <HiOutlineHeart />
      <span>3</span>
    </div>
  );
}
