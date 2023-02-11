import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { changeNotification } from "./notificationReducer";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    storeUser(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { storeUser } = userSlice.actions;

export default userSlice.reducer;

export const setUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("loggedIn", JSON.stringify(user));
    dispatch(storeUser(user));
    dispatch(changeNotification(`Successfully logged in ${user.name}`));
    blogService.setToken(user.token);
  };
};
