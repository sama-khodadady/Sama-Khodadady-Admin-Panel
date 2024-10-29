import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { TbListDetails, TbShoppingBagCheck } from "react-icons/tb";

import { e2p, sp } from "utils/number";
import { productQuantity } from "utils/cart";
import { useCart } from "context/CartContext";

import styles from "./Card.module.css";
import img from "assets/images/tshirt.jfif";

function Card({ data }) {
  const { id, name, price } = data;
  const [state, dispatch] = useCart();
  const quantity = productQuantity(state, id);

  const clickHandler = (type) => {
    dispatch({ type, payload: data });
  };

  return (
    <div className={styles.card}>
      <img src={img} alt="product" />
      <h3>{name}</h3>
      <p>{sp(price)} تومان</p>
      <div className={styles.actions}>
        <Link to={`/products/${id}`}>
          <TbListDetails />
        </Link>
        <div>
          {quantity === 1 && (
            <button onClick={() => clickHandler("REMOVE_ITEM")}>
              <MdDeleteOutline />
            </button>
          )}
          {quantity > 1 && (
            <button onClick={() => clickHandler("DECREASE")}>-</button>
          )}
          {!!quantity && <span>{e2p(quantity)}</span>}
          {quantity === 0 ? (
            <button onClick={() => clickHandler("ADD_ITEM")}>
              <TbShoppingBagCheck />
            </button>
          ) : (
            <button onClick={() => clickHandler("INCREASE")}>+</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
