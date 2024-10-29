import { useQuery } from "@tanstack/react-query";

import { getProduct, getProducts } from "services/products";

//get all products custom hook
const useProducts = (page, price) =>
  useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page, price),
  });

//get a product by id custom hook
const useProduct = (id) =>
  useQuery({ queryKey: ["product", id], queryFn: () => getProduct(id) });

export { useProducts, useProduct };
