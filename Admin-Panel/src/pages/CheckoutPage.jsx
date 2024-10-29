import Layout from "layout/Layout";
import { useCart } from "context/CartContext";
import BasketCard from "components/templates/shop/BasketCard";
import BasketSidebar from "components/templates/shop/BasketSidebar";

import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
  const [state, dispatch] = useCart();

  const clickHandler = (type, payload) => dispatch({ type, payload });

  return (
    <Layout>
      {!state.itemsCounter ? (
        <div className={styles.emptyCart}>
          <img src="/emptybasket.svg" alt="empty cart" />
          <h2>سبد خرید شما خالی است !!</h2>
        </div>
      ) : (
        <div className={styles.container}>
          <BasketSidebar state={state} clickHandler={clickHandler} />
          <div className={styles.products}>
            {state.selectedItems.map((product) => (
              <BasketCard
                key={product.id}
                data={product}
                clickHandler={clickHandler}
              />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default CheckoutPage;
