import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const LINK_API = `${process.env.REACT_APP_API_URL}`;

const getTokenFromLocalStorage = () => {
  const token = JSON.parse(localStorage.getItem("token")) || null;
  return token;
};

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

export const getAllImageGeneral = createAsyncThunk(
  "imageGeneral/getAllImageGeneral",
  async () => {
    const response = await axiosInstance.get(`${LINK_API}/shareImage`);
    return response;
  }
);

export const shareImage = createAsyncThunk(
  "imageGeneral/shareImage",
  async (imageInfo) => {
    try {
      const response = await axiosInstance.post(
        `${LINK_API}/shareImage`,
        imageInfo
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const generateImage = createAsyncThunk(
  "imageGeneral/generateImage",
  async (imageInfo) => {
    const axiosInstance = axios.create({
      baseURL: "https://api.openai.com/v1",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
    });

    const response = await axiosInstance.post(`/images/generations`, imageInfo);
    return response;
  }
);

const imageGeneralSlice = createSlice({
  name: "imageGeneral",
  initialState: {
    loading: false,
    imageGeneral: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      //get all imageGeneral
      .addCase(getAllImageGeneral.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllImageGeneral.fulfilled, (state, action) => {
        state.loading = false;
        state.imageGeneral = action.payload;
      })
      .addCase(getAllImageGeneral.rejected, (state, action) => {
        state.loading = false;
        state.imageGeneral = action.payload;
        state.error = action.error.message;
      })

      //shareImage
      .addCase(shareImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shareImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageGeneral = action.payload;
      })
      .addCase(shareImage.rejected, (state, action) => {
        state.loading = false;
        state.imageGeneral = action.payload;
        state.error = action.error.message;
      })

      //generateImage
      .addCase(generateImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageGeneral = action.payload;
      })
      .addCase(generateImage.rejected, (state, action) => {
        state.loading = false;
        state.imageGeneral = action.payload;
        state.error = action.error.message;
      });
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setError } = imageGeneralSlice.actions;

export default imageGeneralSlice.reducer;
