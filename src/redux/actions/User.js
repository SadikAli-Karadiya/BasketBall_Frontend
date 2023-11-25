import { useLocalStorage } from "../../hooks/localStorage";
import { setToken, setUser } from "../slices/UserSlice";

export const setTokenInLocalStorage = (token) => {
  useLocalStorage({ key: "token", value: token });
};

export const authentication = (token, user) => {
  setTokenInLocalStorage(token);
  return async (dispatch) => {
    dispatch(setToken(token));
    dispatch(setUser(user));
  };
};

export const logout = () => {
  localStorage.clear(); 
  return async (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser({}));
  };
};
