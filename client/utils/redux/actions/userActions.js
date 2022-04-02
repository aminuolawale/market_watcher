import * as t from "../types";
import axios from "axios";

export const loginUser = (data) => (dispatch) => {
  console.log("logging in");
  axios
    .post(`http://127.0.0.1:8000/api/login/`, data)
    .then((res) => dispatch({ type: t.SET_TOKENS, payload: res.data }))
    .catch((err) => console.log(err));
};
