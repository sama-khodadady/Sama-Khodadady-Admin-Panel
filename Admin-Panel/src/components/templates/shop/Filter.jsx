import { useAuth } from "context/AuthContext";
import { createQueryObj } from "utils/search";

import styles from "./Filter.module.css";

function Filter({ price, setPrice }) {
  const { setQuery } = useAuth();

  //filter products by price handler
  const filterHandler = (e) => {
    setPrice((price) => ({ ...price, [e.target.name]: e.target.value }));
    setQuery((query) =>
      createQueryObj(query, { min: price.min, max: price.max })
    );
  };
  //reset filter proces
  const resetHandler = () => {
    setPrice({ min: "", max: "" });
    setQuery((query) => createQueryObj(query, { min: "", max: "" }));
  };

  return (
    <div className={styles.filter}>
      <h4>قیمت ( تومان )</h4>
      <input
        name="min"
        type="text"
        placeholder="از"
        value={price.min}
        onChange={(e) =>
          setPrice((price) => ({ ...price, [e.target.name]: e.target.value }))
        }
      />
      <input
        name="max"
        type="text"
        placeholder="تا"
        value={price.max}
        onChange={(e) =>
          setPrice((price) => ({ ...price, [e.target.name]: e.target.value }))
        }
      />
      <button onClick={filterHandler}>اعمال فیلتر</button>
      <button onClick={resetHandler}>حذف فیلتر</button>
    </div>
  );
}

export default Filter;
