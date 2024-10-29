import { Link } from "react-router-dom";

import styles from "./404.module.css";

function PageNotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.svg}>
        <img src="/404.svg" alt="404" className={styles.number} />
        <img src="/world.svg" alt="world" className={styles.world} />
        <img
          src="/astronout.svg"
          alt="astronout"
          className={styles.astronout}
        />
        <img
          src="/spaceship.svg"
          alt="spaceship"
          className={styles.spaceship}
        />
      </div>
      <div className={styles.actions}>
        <h2>صفحه مورد نظر یافت نشد!</h2>
        <Link to="/">برگشت به صفحه اصلی</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
