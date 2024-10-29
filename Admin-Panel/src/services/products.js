import api from "../configs/api";

//get all prooducts api request
const getProducts = async (page, price) =>
  await api.get(
    `products?page=${page}&limit=12&minPrice=${price?.min || ""}&maxPrice=${
      price?.max || ""
    }'`
  );

//get a prooduct api request
const getProduct = async (id) => await api.get(`products/${id}`);

//add new prooduct api request
const addProduct = async (form) => await api.post("products", form);

//update a product api request
const updateProduct = async (form) => {
  const { id, name, price, quantity } = form;
  return api.put(`/products/${id}`, { name, price, quantity });
};

//delete a product api request
const deleteProduct = async (id) => await api.delete(`products/${id}`);

//multiple products delete api request
const deleteMultiple = async (ids) =>
  await api.delete("products", { data: { ids } });

export {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteMultiple,
};
