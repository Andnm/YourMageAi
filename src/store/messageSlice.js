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

export const getAllMessage = createAsyncThunk(
  "message/getAllMessage",
  async (authorEmail) => {
    const response = await axiosInstance.get(
      `${LINK_API}/message/${authorEmail}`
    );
    return response;
  }
);

export const createMessage = createAsyncThunk(
  "message/createMessage",
  async (senderInfo) => {
    const response = await axiosInstance.post(
      `${LINK_API}/message`,
      senderInfo
    );
    return response;
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    loading: false,
    message: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      //get all message
      .addCase(getAllMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(getAllMessage.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = action.error.message;
      })

      //create message
      .addCase(createMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = action.error.message;
      });
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default messageSlice.reducer;
