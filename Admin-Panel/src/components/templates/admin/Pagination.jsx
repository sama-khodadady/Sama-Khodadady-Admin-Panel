import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

import { e2p, p2e } from "utils/number";
import { useAuth } from "context/AuthContext";

import styles from "./Pagination.module.css";

function Pagination() {
  const { page, setPage } = useAuth();
  //previous page button handler
  const previousHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };
  //next page button handler
  const nextHandler = () => setPage((page) => page + 1);
  //page state handler
  const pageHandler = (e) => {
    setPage(Number(p2e(e.target.innerText)));
  };

  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        {page >= 3 && (
          <MdKeyboardArrowRight
            onClick={previousHandler}
            className={styles.arrow}
          />
        )}
        <p
          onClick={pageHandler}
          className={page === 1 ? styles.selected : null}
        >
          {e2p(1)}
        </p>
        <p
          onClick={pageHandler}
          className={page === 2 ? styles.selected : null}
        >
          {e2p(2)}
        </p>
        <p
          onClick={pageHandler}
          className={page === 3 ? styles.selected : null}
        >
          {e2p(3)}
        </p>
        {page > 3 && (
          <>
            <span>...</span>
            <p className={styles.selected}>{e2p(page)}</p>
          </>
        )}
        {page >= 3 && (
          <MdOutlineKeyboardArrowLeft
            onClick={nextHandler}
            className={styles.arrow}
          />
        )}
      </div>
    </div>
  );
}

export default Pagination;
