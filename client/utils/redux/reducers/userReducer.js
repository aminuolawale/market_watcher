import * as t from "../types";

const userReducer = (
  state = {
    authTokens: null,
    loaded: false,
  },
  action
) => {
  switch (action.type) {
    case t.SET_TOKENS:
      localStorage.setItem("authTokens", JSON.stringify(action.payload));
      return {
        ...state,
        authTokens: action.payload,
        loaded: true,
      };
    case t.SET_LOADED:
      return {
        ...state,
        loaded: true,
      };
    case t.DELETE_TOKEN:
      localStorage.removeItem("authTokens");
      return {
        ...state,
        authTokens: null,
        loaded: true,
      };
    default:
      return state;
  }
};

export default userReducer;
