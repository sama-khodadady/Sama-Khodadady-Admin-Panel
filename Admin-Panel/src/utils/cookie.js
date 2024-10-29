//set user token in cookie in login process
const setCookie = (name, token) =>
  (document.cookie = `${name}=${token}; max-age=${30 * 24 * 60 * 60}; path=/ `);

//get token from cookie
const getCookie = () => document.cookie?.split("=")[1];

//remove token from cookie
const removeCookie = (name, token) =>
  (document.cookie = `${name}=${token}; max-age=0 path=/ `);

export { setCookie, getCookie, removeCookie };
