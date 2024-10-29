import { ThreeDots } from "react-loader-spinner";

import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loader}>
      <ThreeDots width="80px" height="80px" color="#3a8bed" radius="9" />
    </div>
  );
}

export default Loader;
