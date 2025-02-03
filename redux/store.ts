// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import PointOfSale from "./slices/pointOfSale";

 
const store = configureStore({
  reducer: {
    pos: PointOfSale,
  },
});
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
 
export default store;