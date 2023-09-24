import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName :'',
    jwtToken : '',

}

const userSlice = createSlice({
     name: 'user',
     initialState,
     reducers: {
        updateName(state, action){
            state.userName = action.payLoad;
        }
     }
});

export const { updateName } = userSlice.actions;

export default createSlice.reducer;
