import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    selectedCartItems: [],
    cartItemCount: 0,
    error: null,
  },
  reducers: {
    setSelectedCartItems(state, action) {
      state.selectedCartItems = action.payload; // Set selected items to the payload
    },
  },
});

export const { setSelectedCartItems } = cartSlice.actions;
export default cartSlice.reducer;
