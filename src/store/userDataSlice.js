import { createSlice } from "@reduxjs/toolkit";
const initialState={
    likedPosts:[]
}

const userDataSlice=createSlice({
    name:"likedPosts",
    initialState,
    reducers:{
      mutateLikedPost:(state,action)=>{
           state.likedPosts=action.payload
      },
        addToLikedPost:(state,action)=>{
            state.likedPosts.push(action.payload)
          },
          removeFromLikedPost:(state,action)=>{
            state.likedPosts=state.likedPosts.filter(id=>id!==action.payload)
          }
    }
})

export const {mutateLikedPost,addToLikedPost,removeFromLikedPost} =userDataSlice.actions
export default userDataSlice.reducer;