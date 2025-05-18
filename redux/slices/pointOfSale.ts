// src/store/productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export interface OrderLineItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  qty: number;
  stock: number;
  productThumbnail: string | null;
}

interface OrderLineItems {
  products: OrderLineItem[];
}

const getInitialOrderLineItems = (): OrderLineItem[] => {
  try {
    const storedItems = localStorage.getItem("posItems");
    if (storedItems) {
      return JSON.parse(storedItems);
    }
  } catch (error) {
    console.error("Failed to parse cart items from localStorage", error);
  }
  
  return [];
};

const initialState: OrderLineItems = {
  products: [],
};

const saveItemsToLocalStorage = (items: OrderLineItem[]) => {
  localStorage.setItem("posItems", JSON.stringify(items));
};
const pointOfSaleSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadOrderLineItem: (state) => {
          state.products = getInitialOrderLineItems();
        },
    addProductToOrderLine: (state, action: PayloadAction<OrderLineItem>) => {
      const existingItem = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.qty += 1;
        saveItemsToLocalStorage(state.products);
        return;
      } else {
        state.products.push(action.payload);
        saveItemsToLocalStorage(state.products);
      }
      toast.success("Item added Successfully");
    },
    removeProductFromOrderLine: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      saveItemsToLocalStorage(state.products);
      toast.success("Item Removed Successfully");
    },
    removeProductsfromLocalStorage: (state) => {
      state.products = [];
      saveItemsToLocalStorage(state.products);
    },
    incrementQty: (state, action: PayloadAction<number>) => {
      const item = state.products.find(
        (product) => product.id === action.payload
      );
      if (item && item.qty < item.stock) {
        item.qty += 1;
        saveItemsToLocalStorage(state.products);
      }
    },
    decrementQty: (state, action: PayloadAction<number>) => {
      const item = state.products.find(
        (product) => product.id === action.payload
      );
      if (item && item.qty > 1) {
        item.qty -= 1;
        saveItemsToLocalStorage(state.products);
      } else {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
        saveItemsToLocalStorage(state.products);
        toast.success("Item Removed Successfully");
      }
    },
  },
});

export const {
  loadOrderLineItem,
  addProductToOrderLine,
  removeProductFromOrderLine,
  removeProductsfromLocalStorage,
  incrementQty,
  decrementQty,
} = pointOfSaleSlice.actions;
export default pointOfSaleSlice.reducer;
