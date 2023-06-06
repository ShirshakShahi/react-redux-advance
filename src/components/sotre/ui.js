import { createSlice } from "@reduxjs/toolkit";

const initialUIstate = { cartIsShown: true, notification: null };

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUIstate,
    reducers: {
        showCard(state) {
            state.cartIsShown = !state.cartIsShown;
        },

        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }

        }
    }
})

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;