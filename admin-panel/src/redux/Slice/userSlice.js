import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  email: "",
  photoURL: "",
  uid: "",
  postcount: 0,
};



const userSlice = createSlice({
  name: "user",
  initialState,
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
