import authSerivce from "../services/auth.serivce";
import {
    LOGIN_AUTH
  } from "./types";

  export const loginUser = (data) => async (dispatch) => {
    try {
      const res = await authSerivce.login(data);
  
      console.log("token", res.data.username);

      localStorage.setItem("user", res.data.fullName);

      return userAuth(res.data, dispatch);

    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const userAuth = (user, dispatch) => {

    
    dispatch({
      type: LOGIN_AUTH,
      payload: user,
    });

    return Promise.resolve(user);

  };