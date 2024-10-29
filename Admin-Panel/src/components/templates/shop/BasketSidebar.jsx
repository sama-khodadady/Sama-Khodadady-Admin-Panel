import { FaHashtag } from "react-icons/fa6";
import { TbChecklist } from "react-icons/tb";
import { BsPatchCheck } from "react-icons/bs";

import { e2p, sp } from "utils/number";

import styles from "./BasketSidebar.module.css";

function BasketSidebar({ state, clickHandler }) {
  const { total, itemsCounter, checkout } = state;

  return (
    <div className={styles.sidebar}>
      <div>
        <TbChecklist />
        <p>قیمت کل</p>
        <span>{sp(total)} $</span>
      </div>
      <div>
        <FaHashtag />
        <p>تعداد:</p>
        <span>{e2p(itemsCounter)}</span>
      </div>
      <div>
        <BsPatchCheck />
        <p>وضعیت:</p>
        <span>{!checkout && "درحال بررسی..."}</span>
      </div>
      <button onClick={() => clickHandler("CHECKOUT")}>Checkout</button>
    </div>
  );
}

export default BasketSidebar;
