import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LINK_API = `${process.env.REACT_APP_API_URL}`;

//xử lý ở local
const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

const saveOtpUserToLocalStorage = (otpInfo) => {
  localStorage.setItem("otpInfo", JSON.stringify(otpInfo));
};

export const removeOtpUserToLocalStorage = () => {
  localStorage.removeItem("otpInfo");
};

export const getUserFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  return user;
};

export const updateUserFromLocalStorage = (newUser) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (currentUser) {
    const updatedUser = { ...currentUser, ...newUser };

    localStorage.setItem("user", JSON.stringify(updatedUser));
  }
};

//save token ở local
const saveTokenToLocalStorage = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

const getTokenFromLocalStorage = () => {
  const token = JSON.parse(localStorage.getItem("token")) || null;
  return token;
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const response = await axios.post(
      `${LINK_API}/auth/signin`,
      userCredentials
    );
    const token = response.data.accessToken;
    const user = jwtDecode(token);
    saveTokenToLocalStorage(token);
    saveUserToLocalStorage(user);
    return user;
  }
);

export const getUser = createAsyncThunk("user/getUser", async (email) => {
  const axiosInstance = axios.create({
    baseURL: LINK_API,
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    },
  });
  const response = await axiosInstance.get(`${LINK_API}/users/${email}`);
  return response;
});

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userCredentials) => {
    const response = await axios.post(
      `${LINK_API}/auth/signup`,
      userCredentials
    );
    return response;
  }
);

export const deleteUser = createAsyncThunk("user/deleteUser", async (email) => {
  const axiosInstance = axios.create({
    baseURL: LINK_API,
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    },
  });
  try {
    const response = await axiosInstance.delete(`/users/${email}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getAllUserByAdmin = createAsyncThunk("user/getAllUserByAdmin", async (pageIndex) => {
  const axiosInstance = axios.create({
    baseURL: LINK_API,
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    },
  });
  const response = await axiosInstance.get(`${LINK_API}/users?page=${pageIndex}`);
  return response;
});

export const getTotalUsers = createAsyncThunk("user/getTotalUsers", async () => {
  const axiosInstance = axios.create({
    baseURL: LINK_API,
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    },
  });
  const response = await axiosInstance.get(`${LINK_API}/users/totalUsers`);
  return response;
});

export const addHistoryImageGenerated = createAsyncThunk(
  "user/addHistoryImageGenerated",
  async (infoGenerated) => {
    const axiosInstance = axios.create({
      baseURL: LINK_API,
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    });

    const response = await axiosInstance.post(
      `/users/historyImageGenerated`,
      infoGenerated
    );
    return response;
  }
);

//email services
export const sendOtpRegister = createAsyncThunk(
  "user/sendOtpRegister",
  async (userCredentials) => {
    const response = await axios.post(
      `${LINK_API}/email/sendOtpRegister`,
      userCredentials
    );
    return response;
  }
);

export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (userCredentials) => {
    const response = await axios.post(
      `${LINK_API}/email/verifyOtp`,
      userCredentials
    );
    return response;
  }
);

export const loginGoogle = createAsyncThunk(
  "user/loginGoogle",
  async (accessToken) => {
    const token = { token: accessToken };

    try {
      const response = await axios.post(`${LINK_API}/auth/google/login`, token);

      const tokenFromResponse = response.data.accessToken;
      const user = jwtDecode(tokenFromResponse);
      saveUserToLocalStorage(user);
      saveTokenToLocalStorage(tokenFromResponse);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
);

//change profile
export const changeUserName = createAsyncThunk(
  "user/changeUserName",
  async ({ email, username }) => {
    const axiosInstance = axios.create({
      baseURL: LINK_API,
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    });

    const response = await axiosInstance.patch(
      `/users/${email}/username/${username}`
    );
    return response;
  }
);

export const changeInterests = createAsyncThunk(
  "user/changeInterests",
  async ({ email, newInterests }) => {
    const axiosInstance = axios.create({
      baseURL: LINK_API,
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    });

    const interests = { interests: newInterests };
    const response = await axiosInstance.patch(
      `/users/${email}/interests`,
      interests
    );
    return response;
  }
);

//upgrade level
export const upgradeLevel = createAsyncThunk(
  "user/upgradeLevel",
  async ({ email, level }) => {
    const axiosInstance = axios.create({
      baseURL: LINK_API,
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    });

    const response = await axiosInstance.patch(
      `/users/${email}/level/${level}`
    );
    return response;
  }
);

//upgrade token
export const upgradeToken = createAsyncThunk("user/upgradeToken", async () => {
  const axiosInstance = axios.create({
    baseURL: LINK_API,
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    },
  });

  const email = getUserFromLocalStorage().email;

  const response = await axiosInstance.patch(`/users/generate/${email}`);
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;

        if (action?.error?.message === "Request failed with status code 401") {
          state.error = "Your password is not correct!";
        } else if (
          action.error?.message === "Request failed with status code 404"
        ) {
          state.error = "Account not found!";
        } else if (
          action.error?.message === "Request failed with status code 400"
        ) {
          state.error = "Password is not correct!";
        } else {
          state.error = action.error?.message;
        }
      })
      //login gg
      .addCase(loginGoogle.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        state.loading = false;
        state.user = null;

        if (action?.error?.message === "Request failed with status code 401") {
          state.error = "Your password is not correct!";
        } else if (
          action.error?.message === "Request failed with status code 404" ||
          "Request failed with status code 400"
        ) {
          state.error = "Account not found!";
        } else {
          state.error = action.error.message;
        }
      })
      //get User
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      //get all user by admin
      .addCase(getAllUserByAdmin.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(getAllUserByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getAllUserByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      //get total users
      .addCase(getTotalUsers.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(getTotalUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getTotalUsers.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      //create user
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        if (action.error?.message === "Request failed with status code 400") {
          state.error = "Your email already existed!";
        } else {
          state.error = null;
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;

        if (action.error.message === "Request failed with status code 400") {
          state.error = "Your email already existed!";
        } else {
          state.error = action.error.message;
        }
      })
      //delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        removeUserFromLocalStorage();
        removeTokenFromLocalStorage();
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      //addHistoryImageGenerated
      .addCase(addHistoryImageGenerated.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHistoryImageGenerated.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(addHistoryImageGenerated.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })

      //send otp register
      .addCase(sendOtpRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtpRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        saveOtpUserToLocalStorage(state.user);
      })
      .addCase(sendOtpRegister.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      //verify otp
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        if (action.error.message === "Request failed with status code 400") {
          state.error = "Wrong OTP! Please try again!";
        } else {
          state.error = action.error.message;
        }
      })

      //CHANGE PROFILE
      //change user name
      .addCase(changeUserName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(changeUserName.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = action.error.message;
      })

      //change interests
      .addCase(changeInterests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeInterests.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(changeInterests.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = action.error.message;
      })

      //upgrade level
      .addCase(upgradeLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(upgradeLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(upgradeLevel.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = action.error.message;
      })

      //upgrade Token
      .addCase(upgradeToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(upgradeToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(upgradeToken.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = action.error.message;
      });
  },
  reducers: {
    logoutUser: (state) => {
      removeUserFromLocalStorage();
      removeTokenFromLocalStorage();
      state.loading = false;
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { logoutUser, setError } = userSlice.actions;

export default userSlice.reducer;
