//get products price in store
const sumProducts = (products) => {
  const itemsCounter = products.reduce(
    (counter, product) => counter + product.quantity,
    0
  );
  const total = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  return { itemsCounter, total };
};

//get each products quantity that customer add to cart
const productQuantity = (state, id) => {
  const index = state.selectedItems.findIndex((item) => item.id === id);
  if (index === -1) return 0;
  return state.selectedItems[index].quantity;
};

export { sumProducts, productQuantity };
