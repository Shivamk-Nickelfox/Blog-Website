import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  title: "",
  content: "",
  thumbnailURL: "",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setThumbnailURL: (state, action) => {
      state.thumbnailURL = action.payload;
    },
    clearBlog: (state) => {
      state.title = "";
      state.content = "";
      state.thumbnailURL = "";
    },
  },
});

export const { setContent, setThumbnailURL, setTitle, clearBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
