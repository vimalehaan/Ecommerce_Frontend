import { createSlice } from "@reduxjs/toolkit";

const shippingDetailSlice = createSlice({
  name: "shippingDetail",
  initialState: {
    fullname: "",
    phoneNo: "",
    houseNo: "",
    street: "",
    city: "",
    district: "",
    province: "",
    postalCode: "",
  },
  reducers: {
    setShippingDetails(state, action) {
      // Update the shipping details state with the provided payload
      return { ...state, ...action.payload };
    },
  },
});

export const { setShippingDetails } = shippingDetailSlice.actions;
export default shippingDetailSlice.reducer;
