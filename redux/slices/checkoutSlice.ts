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

export interface CheckoutState {
  personalDetails: PersonalDetails;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
}

export const loadState = (): CheckoutState | undefined => {

  try {
    const checkoutInfo = localStorage.getItem('checkoutState');
    if (checkoutInfo === null) {
      return undefined;
    }
    return JSON.parse(checkoutInfo);
  } catch (err) {
    console.error("Failed to load checkout state from local storage", err);
    return undefined;
  }
}

export const saveState = (state: CheckoutState) => {
  
  try {
    const checkoutInfo = JSON.stringify(state);
    localStorage.setItem("checkoutState", checkoutInfo);
  } catch (err) {
    console.error("Failed to save checkout state to local storage", err);
  }
}

const initialState: CheckoutState = {
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
      saveState(state);
    },
    setShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
      saveState(state);
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
      saveState(state);
    },
  },
});

export const { setPersonalDetails, setShippingAddress, setPaymentMethod } =
  checkoutInfoState.actions;
export default checkoutInfoState.reducer;
