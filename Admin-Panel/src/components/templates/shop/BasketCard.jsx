import { MdDeleteOutline } from "react-icons/md";

import styles from "./BasketCard.module.css";
import img from "assets/images/tshirt.jfif";

function BasketCard({ data, clickHandler }) {
  const { name, quantity } = data;
  return (
    <div className={styles.card}>
      <img src={img} alt={name} />
      <p>{name}</p>
      <div className={styles.actions}>
        {quantity === 1 && (
          <button onClick={() => clickHandler("REMOVE_ITEM", data)}>
            <MdDeleteOutline />
          </button>
        )}
        {quantity > 1 && (
          <button onClick={() => clickHandler("DECREASE", data)}>-</button>
        )}
        <span>{quantity}</span>
        <button onClick={() => clickHandler("INCREASE", data)}>+</button>
      </div>
    </div>
  );
}

export default BasketCard;
