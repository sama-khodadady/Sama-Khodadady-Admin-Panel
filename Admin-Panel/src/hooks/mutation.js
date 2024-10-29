import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login, registration } from "services/auth";
import {
  addProduct,
  deleteMultiple,
  deleteProduct,
  updateProduct,
} from "../services/products";

//register custom hook
const useRegister = () => useMutation({ mutationFn: registration });

//login custom hook
const useLogin = () => useMutation({ mutationFn: login });

//add new product custom hook
const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => queryClient.invalidateQueries("products"),
  });
};

//update a product custom hook
const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => queryClient.invalidateQueries("product"),
  });
};

//delete a product custom hook
const useDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => queryClient.invalidateQueries("products"),
  });
};

//multiple product delete custom hook
const useMultipleDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids) => deleteMultiple(ids),
    onSuccess: () => queryClient.invalidateQueries("products"),
  });
};

export {
  useRegister,
  useLogin,
  useAddProduct,
  useUpdateProduct,
  useDelete,
  useMultipleDelete,
};
