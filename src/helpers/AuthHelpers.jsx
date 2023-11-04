import Cookies from "js-cookie";

export const getAccessToken = () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken || null;
};
export const saveTokensStorage = (data) => {
  console.log(data);
  Cookies.set("accessToken", data);
  // Cookies.set('refreshToken', data.refreshToken)
};

export const delToken = () => {
  Cookies.remove("accessToken");
};

export const saveToStorage = (data) => {
  saveTokensStorage(data);
  // localStorage.setItem('user', JSON.stringify(data.user))
};
