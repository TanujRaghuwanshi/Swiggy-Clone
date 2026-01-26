import { createSlice } from "@reduxjs/toolkit";


const toggleSlice = createSlice({
    name : "toggleSlice",
    initialState : {
        searchToggle : false,
        loginToggle : false
    },
    reducers : {
        toggleSearch : (state, action) =>{
            state.searchToggle = !state.searchToggle
        },
        toggleLogin : (state, action) =>{
            state.loginToggle = !state.loginToggle
        }
    }
})

export const {toggleSearch, toggleLogin} = toggleSlice.actions 
export default toggleSlice.reducer