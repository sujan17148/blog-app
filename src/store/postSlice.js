import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
  allPostStats:[],
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
    },
    mutatePostStats:(state,action)=>{
      state.allPostStats=action.payload
     },
     addNewPostStat:(state,action)=>{
      state.allPostStats.push(action.payload);
     },
     removePoststat:(state,action)=>{
        state.allPostStats = state.allPostStats.filter((post) => post.$id !== action.payload)
     },
     toggleLikes:(state,action)=>{
       state.allPostStats=state.allPostStats.map(postStat=>postStat.$id==action.payload.$id ? {...postStat, ...action.payload} : postStat)
     },
     increaseViewsLocally:(state,action)=>{
      state.allPostStats=state.allPostStats.map(postStat=>postStat.$id==action.payload.$id ?{...postStat, ...action.payload} : postStat)
     }
  },
});

export const { mutatePost, addPost, updatePost, removePost,mutatePostStats,toggleLikes,increaseViewsLocally,addNewPostStat,removePoststat} =
  postSlice.actions;
export default postSlice.reducer;
