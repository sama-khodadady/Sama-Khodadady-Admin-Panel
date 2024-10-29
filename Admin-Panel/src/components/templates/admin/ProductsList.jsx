import { createQueryObj } from "utils/search";
import { useAuth } from "context/AuthContext";
import { e2p, shortenId, sp } from "utils/number";

import styles from "./ProductsList.module.css";

function ProductsList({ data, setForm, ids, setIds }) {
  const { setQuery, setIsEdit, setAddModal, setIsDelete } = useAuth();
  const { name, price, quantity, id } = data;

  //edit button handler
  const editHandler = () => {
    setIsEdit(true);
    setQuery((query) => createQueryObj(query, { edit: id }));
    setForm(data);
    setAddModal(true);
  };
  //delete button handler
  const deleteHandler = () => {
    setIsDelete(true);
    setQuery((query) => createQueryObj(query, { delete: id }));
  };
  //checkbox handler
  const checkboxHandler = (event) => {
    const { id: currentId, checked } = event.target;
    checked
      ? setIds([...ids, currentId])
      : setIds(ids.filter((id) => id !== currentId));
  };

  return (
    <>
      <tr className={styles.row}>
        <td>{name}</td>
        <td>{e2p(quantity)}</td>
        <td>{sp(price)} تومان</td>
        <td>{shortenId(id)}</td>
        <td className={styles.actions}>
          <input type="checkbox" id={id} onChange={checkboxHandler} />
          <img src="/edit.svg" alt="edit" onClick={editHandler} />
          <img src="/trash.svg" alt="trash" onClick={deleteHandler} />
        </td>
      </tr>
    </>
  );
}

export default ProductsList;
