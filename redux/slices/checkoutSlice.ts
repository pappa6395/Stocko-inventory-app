import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
export interface ShippingAddress {
  streetAddress: string;
  unitNumber: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
export interface PaymentMethod {
  method: string;
}

export interface checkoutState {
  personalDetails: PersonalDetails;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
}

const initialState: checkoutState = {
  personalDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  shippingAddress: {
    streetAddress: "",
    unitNumber: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
  paymentMethod: {
    method: "",
  },
};

const checkoutInfoState = createSlice({
  name: "checkoutInfo",
  initialState,
  reducers: {
    setPersonalDetails: (state, action: PayloadAction<PersonalDetails>) => {
      state.personalDetails = action.payload;
    },
    setShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const { setPersonalDetails, setShippingAddress, setPaymentMethod } =
  checkoutInfoState.actions;
export default checkoutInfoState.reducer;
