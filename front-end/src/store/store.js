
import { createStore } from "redux";

// Redux store and actions
const initialState = {
  accessToken: sessionStorage.getItem("accessToken") || null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

// Action to set the accessToken
const setAccessToken = (token) => ({
  type: "SET_ACCESS_TOKEN",
  payload: token,
});

export {store, setAccessToken};