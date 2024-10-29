//searching process
const searchProducts = (productsData, search) => {
  if (!search) return productsData;
  const searchedProducts = productsData.filter(
    (product) =>
      product.name.toLowerCase().includes(search) ||
      product.price.toString().includes(search) ||
      product.quantity.toString().includes(search) ||
      product.id.toString().includes(search)
  );
  return searchedProducts;
};

//create query strings obj
const createQueryObj = (currentQuery, newQuery) => {
  if (newQuery.search === "") {
    const { search, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.delete === "") {
    const { delete: deleteParam, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.edit === "") {
    const { edit: editParam, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.min === "" || newQuery.max === "") {
    const { min: minParam, max: maxParam, ...rest } = currentQuery;
    return rest;
  }

  return { ...currentQuery, ...newQuery };
};

export { searchProducts, createQueryObj };
