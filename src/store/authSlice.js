import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null
}

const authSLice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true
            state.userData=action.payload
        },
        logOut:(state)=>{
         state.status=false
         state.userData=null
        }
    }
})

export const {logOut,login} =authSLice.actions;
export default authSLice.reducer