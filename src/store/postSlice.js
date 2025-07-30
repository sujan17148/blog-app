import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
}
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    mutatePost: (state, action) => {
      state.allPosts = action.payload;
    },
    addPost: (state, action) => {
      state.allPosts.push(action.payload);
    },
    updatePost: (state, action) => {
      state.allPosts = state.allPosts.map((post) =>
        post.$id === action.payload.$id ? action.payload : post
      );
    },
    removePost: (state, action) =>{
      state.allPosts = state.allPosts.filter((post) => post.$id !== action.payload)
    }
  },
});

export const { mutatePost, addPost, updatePost, removePost} =
  postSlice.actions;
export default postSlice.reducer;
