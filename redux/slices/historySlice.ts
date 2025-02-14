
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HistoryItem {
  id: number;
  name: string;
  slug: string;
  productPrice: number;
  productThumbnail: string;
  productDetails: string;
  stockQty: number;
}

interface HistoryState {
  historyItems: HistoryItem[];
}

// Safely retrieve cart items from localStorage
const getInitialhistoryItems = (): HistoryItem[] => {
  try {
    const storedHistory = localStorage.getItem("cart");
    if (storedHistory) {
      return JSON.parse(storedHistory);
    }
  } catch (error) {
    console.error("Failed to parse history item from localStorage", error);
  }
  return [];
};

const initialState: HistoryState = {
  historyItems: getInitialhistoryItems(),
};
const saveItemsToLocalStorage = (items: HistoryItem[]) => {
  localStorage.setItem("history", JSON.stringify(items));
};
const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addProductToHistory: (state, action: PayloadAction<HistoryItem>) => {
      const existingItem = state.historyItems.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.stockQty += action.payload.stockQty;
        saveItemsToLocalStorage(state.historyItems);
        return;
      } else {
        state.historyItems.push(action.payload);
        saveItemsToLocalStorage(state.historyItems);
      }
    },
    removeProductFromHistory: (state, action: PayloadAction<number>) => {
      state.historyItems = state.historyItems.filter(
        (item) => item.id !== action.payload
      );
      saveItemsToLocalStorage(state.historyItems);
    },
  },
});

export const {
  addProductToHistory,
  removeProductFromHistory,
} = historySlice.actions;
export default historySlice.reducer;