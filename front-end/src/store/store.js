
import { createStore } from "redux";

// Redux store and actions
const initialState = {
  accessToken: sessionStorage.getItem("accessToken") || null,
  user: JSON.parse(sessionStorage.getItem("user")) || null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return { ...state, accessToken: action.payload };
    case "SET_USER":
      return {...state, user: action.payload}
    default:
      return state;
  }
  
};

const store = createStore(reducer);

// Action to set the accessToken
const setAccessToken = (token) => {
  // Update localStorage
  sessionStorage.setItem("accessToken", token);

  // Dispatch the action
  return {
    type: "SET_ACCESS_TOKEN",
    payload: token,
  };
};
const setUser = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));

  return {
    type: "SET_USER",
    payload: user,
  }
}

export {store, setAccessToken,setUser};