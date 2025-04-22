import { createSlice } from "@reduxjs/toolkit";

const initilialState = {
  displayName: "",
  email: "",
  photoURL: "",
  uid: "",
  postcount: 0,
};

const savedUser = localStorage.getItem("user");
if (savedUser) {
  const parsedUser = JSON.parse(savedUser);
  initilialState.displayName = parsedUser.displayName;
  initilialState.email = parsedUser.email;
  initilialState.photoURL = parsedUser.photoURL;
  initilialState.uid = parsedUser.uid;
}

const userSlice = createSlice({
  name: "user",
  initialState: initilialState,
  reducers: {
    login: (state, action) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.uid = action.payload.uid;
    },
    logout: (state) => {
      state.displayName = "";
      state.email = "";
      state.photoURL = "";
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
