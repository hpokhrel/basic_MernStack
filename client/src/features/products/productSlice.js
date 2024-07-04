import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:4321/api/getproducts");
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const response = await axios.post(
      "http://localhost:4321/api/postproducts",
      product
    );
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, product }) => {
    const response = await axios.patch(
      `http://localhost:4321/api/updateproducts/${id}`,
      product
    );
    return response.data;
  }
);

export const deleteProductAction = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`http://localhost:4321/api/deleteproducts/${id}`);
    return id;
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id) => {
    await axios.get(`http://localhost:4321/api/getproducts/${id}`);
    return id;
  }
);

export const getFilteredProducts = createAsyncThunk(
  "products/getFilteredProducts",
  async (minPrice) => {
    const response = await axios.get(
      `http://localhost:4321/api/filtered?minPrice=${minPrice}`
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    filteredProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })

      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        // state.products = state.products.map((product) => {
        //   if (product._id === action.payload._id) {
        //     return action.payload;
        //   }
        //   return product;
        // });
        return action.payload;
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteProductAction.fulfilled, (state, action) => {
        return state.filter((product) => product._id !== action.payload);
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(getFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
