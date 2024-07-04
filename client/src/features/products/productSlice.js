import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:4321/api/products");
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const response = await axios.post(
      "http://localhost:4321/api/products",
      product
    );
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, product }) => {
    const response = await axios.put(
      `http://localhost:4321/api/products/${id}`,
      product
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`http://localhost:4321/api/products/${id}`);
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.findIndex(
          (product) => product._id === action.payload._id
        );
        state[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        return state.filter((product) => product._id !== action.payload);
      });
  },
});

export default productSlice.reducer;
