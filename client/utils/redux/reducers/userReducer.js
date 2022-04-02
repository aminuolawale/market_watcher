import * as t from "../types";

const userReducer = (
  state = {
    // authTokens: localStorage.getItem("authTokens")
    //   ? JSON.parse(localStorage.getItem("authTokens"))
    //   : null,
  },
  action
) => {
  switch (action.type) {
    case t.SET_TOKENS:
      console.log("reducer", action.payload);
      localStorage.setItem("authTokens", JSON.stringify(action.payload));
      return {
        ...state,
        authTokens: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
