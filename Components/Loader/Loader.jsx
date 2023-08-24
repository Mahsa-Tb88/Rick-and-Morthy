import style from "./Loader.module.css";
function Loader() {
  return (
    <div className={style.loading}>
      <p>The data is loading please wait ...</p>
    </div>
  );
}

export default Loader;
