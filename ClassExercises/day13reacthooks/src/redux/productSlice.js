import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  }
);

const productSlice = createSlice({

  name: "products",

  initialState: {
    items: [],
    status: "idle"
  },

  reducers: {

    updateProduct: (state, action) => {

      const index = state.items.findIndex(
        p => p.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }

    }

  },

  extraReducers: builder => {

    builder.addCase(fetchProducts.pending, state => {
      state.status = "loading";
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });

  }

});

export const { updateProduct } = productSlice.actions;

export default productSlice.reducer;