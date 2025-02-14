// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import PointOfSale from "./slices/pointOfSale";
import cartSlice from "./slices/cartSlice";
import historySlice from "./slices/historySlice";

 
const store = configureStore({
  reducer: {
    pos: PointOfSale,
    cart: cartSlice,
    history: historySlice
  },
});
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
 
export default store;