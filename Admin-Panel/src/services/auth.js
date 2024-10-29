import api from "../configs/api";

//registration api requset
const registration = async (formData) => {
  const { username, password } = formData;
  return await api.post("auth/register", { username, password });
};

//login api request
const login = async (formData) => await api.post("auth/login", formData);

export { registration, login };
