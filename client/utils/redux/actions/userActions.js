import * as t from "../types";
import axios from "axios";

export const loginUser = (data) => (dispatch) => {
  console.log("logging in");
  axios
    .post(`http://127.0.0.1:8000/api/login/`, data)
    .then((res) => {
      if (res.status == 200)
        dispatch({ type: t.SET_TOKENS, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const refreshToken = (token) => (dispatch) => {
  console.log(token);
  axios
    .post(`http://127.0.0.1:8000/api/refresh-token/`, token)
    .then((res) => dispatch({ type: t.SET_TOKENS, payload: res.data }))
    .catch((err) => dispatch({ type: t.DELETE_TOKEN }));
};
