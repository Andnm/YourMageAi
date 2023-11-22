import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const LINK_API = `${process.env.REACT_APP_API_URL}`;

const getTokenFromLocalStorage = () => {
  const token = JSON.parse(localStorage.getItem("token")) || null;
  return token;
};

//handle Bearer
const axiosInstance = axios.create({
  baseURL: LINK_API,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllTransaction = createAsyncThunk(
  "transaction/getAllTransaction",
  async (pageIndex) => {
    const response = await axiosInstance.get(`${LINK_API}/transactions?page=${pageIndex}`);
    return response;
  }
);

export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (transactionInfo) => {
    const response = await axiosInstance.post(
      `${LINK_API}/transactions`,
      transactionInfo
    );
    return response;
  }
);

export const confirmTransaction = createAsyncThunk(
  "transaction/confirmTransaction",
  async (transactionId) => {
    const response = await axiosInstance.patch(
      `${LINK_API}/transactions/confirmTransaction`,
      transactionId
    );
    return response;
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    loadingRow: false,
    loading: false,
    transaction: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      //get all
      .addCase(getAllTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
      })
      .addCase(getAllTransaction.rejected, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
        state.error = action.error.message;
      })

      //create transaction
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
        state.error = action.error.message;
      })

      //confirm transaction
      .addCase(confirmTransaction.pending, (state) => {
        state.loadingRow = true;
        state.error = null;
      })
      .addCase(confirmTransaction.fulfilled, (state, action) => {
        state.loadingRow = false;
        state.transaction = action.payload;
      })
      .addCase(confirmTransaction.rejected, (state, action) => {
        state.loadingRow = false;
        state.transaction = action.payload;
        state.error = action.error.message;
      });
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setError } = transactionSlice.actions;

export default transactionSlice.reducer;
