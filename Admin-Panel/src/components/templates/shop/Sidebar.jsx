import { createQueryObj } from "utils/search";
import Filter from "components/templates/shop/Filter";

import styles from "./Sidebar.module.css";

function Sidebar({ refetch, price, setPrice, search, setSearch, setQuery }) {
  const searchHandler = () => {
    setQuery((query) => createQueryObj(query, { search }));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.search}>
        <h4>جستجو</h4>
        <div>
          <input
            type="text"
            placeholder="جستجو محصول"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
          />
          <button onClick={searchHandler}>جستجو</button>
        </div>
      </div>
      <Filter price={price} setPrice={setPrice} refetch={refetch} />
    </div>
  );
}

export default Sidebar;
