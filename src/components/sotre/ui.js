import { createSlice } from "@reduxjs/toolkit";

const initialUIstate = { cartIsShown: true };

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUIstate,
    reducers: {
        showCard(state) {
            state.cartIsShown = !state.cartIsShown;
        }
    }
})

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;