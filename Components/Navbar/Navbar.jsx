import { HiOutlineHeart } from "react-icons/hi";
import Style from "./Navbar.module.css";
function Navbar() {
  return (
    <div className={Style.navbar}>
      <h3>Loogo</h3>
      <input type="text" placeholder="search..." />
      <div className={Style.navbar_result}>Fpound x Characters</div>
      <div className={Style.navbar_heart}>
        <HiOutlineHeart />
        <span>3</span>
      </div>
    </div>
  );
}
export default Navbar;
