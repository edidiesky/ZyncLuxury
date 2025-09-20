import { createSlice } from "@reduxjs/toolkit";
import {
  LoginUser,
  RegisterUser,
  GetAllUsers,
  DeleteSingleUser,
  UpdateSingleUser,
  addListToWish,
  GetSingleUser,
} from "./authReducer";
import { showCustomToast } from "@/components/common/CustomToast";
const customerToken = localStorage.getItem("customertoken");
const getUserData = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("customer");
    if (storedUser && storedUser !== "undefined") {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("customer");
      }
    }
  }
  return null;
};

const initialState = {
  users: [],
  token: customerToken ? JSON.parse(customerToken) : "",
  currentUser: getUserData(),
  userInfo: null,
  alertText: "",
  showAlert: false,
  alertType: "",
  loginisLoading: false,
  loginisSuccess: false,
  loginisError: false,

  registerisLoading: false,
  registerisSuccess: false,
  registerisError: false,

  getallUserisLoading: false,
  getallUserisSuccess: false,
  getallUserisError: false,

  deleteUserisLoading: false,
  deleteUserisSuccess: false,
  deleteUserisError: false,

  updateUserisLoading: false,
  updateUserisSuccess: false,
  updateUserisError: false,
  noOfPages: 0,
  totalUser: 0,

  wishisLoading: false,
  wishisSuccess: false,
  wishisError: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleClearUserAlert: (state, action) => {
      state.deleteUserisLoading = false;
      state.deleteUserisSuccess = false;
    },
    ClearUserInfo: (state, action) => {
      localStorage.removeItem("customertoken");
      localStorage.removeItem("customer");
      // state.isLoading = false;
      state.alertType = "";
      state.showAlert = false;
      state.alertText = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state, action) => {
      state.loginisLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.loginisLoading = false;
      state.loginisSuccess = true;
      const { user, accessToken } = action.payload.data;
      state.currentUser = user;
      state.token = accessToken;
      localStorage.setItem("customertoken", JSON.stringify(accessToken));
      localStorage.setItem("customer", JSON.stringify(user));
      showCustomToast(action.payload?.message || "Login sucessful!", "success");
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.loginisSuccess = false;
      state.loginisLoading = false;
      showCustomToast(action.payload.message, "error"); //
      // showCustomToast("Login in Progress... Kindly wait!!", "info");
    });

    builder.addCase(RegisterUser.pending, (state, action) => {
      state.registerisLoading = true;
    });
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      state.registerisLoading = false;
      state.registerisSuccess = true;
      showCustomToast("registration sucessful", "success");
    });
    builder.addCase(RegisterUser.rejected, (state, action) => {
      state.registerisSuccess = false;
      state.registerisLoading = false;
      showCustomToast(action.payload, "error");
    });
    // GetSingleUser
    builder.addCase(GetAllUsers.pending, (state, action) => {
      state.getallUserisLoading = true;
    });
    builder.addCase(GetAllUsers.fulfilled, (state, action) => {
      state.getallUserisLoading = false;
      state.getallUserisSuccess = true;
      state.users = action.payload.data.user;
      state.totalUser = action.payload.data.totalUser;
    });
    builder.addCase(GetAllUsers.rejected, (state, action) => {
      state.getallUserisSuccess = false;
      showCustomToast(action.payload, "error");
    });

    builder.addCase(GetSingleUser.pending, (state, action) => {
      state.getallUserisLoading = true;
    });
    builder.addCase(GetSingleUser.fulfilled, (state, action) => {
      state.getallUserisLoading = false;
      state.getallUserisSuccess = true;
      state.userInfo = action.payload.user;
    });
    builder.addCase(GetSingleUser.rejected, (state, action) => {
      state.getallUserisSuccess = false;
      showCustomToast(action.payload, "error");
    });

    builder.addCase(DeleteSingleUser.pending, (state, action) => {
      state.deleteUserisLoading = true;
    });
    builder.addCase(DeleteSingleUser.fulfilled, (state, action) => {
      state.deleteUserisLoading = false;
      state.deleteUserisSuccess = true;
      state.users = state.users.filter((user) => user?.id !== action.payload);
      showCustomToast("deleted user sucessfully!!!!", "success");
    });
    builder.addCase(DeleteSingleUser.rejected, (state, action) => {
      state.deleteUserisSuccess = false;
      state.deleteUserisLoading = false;
      showCustomToast(action.payload, "error");
    });

    builder.addCase(UpdateSingleUser.pending, (state, action) => {
      state.updateUserisLoading = true;
    });
    builder.addCase(UpdateSingleUser.fulfilled, (state, action) => {
      state.updateUserisLoading = false;
      state.updateUserisSuccess = true;
      showCustomToast("updated user sucessfully!!!!", "success");
    });
    builder.addCase(UpdateSingleUser.rejected, (state, action) => {
      state.updateUserisSuccess = false;
      state.updateUserisLoading = false;
      showCustomToast(action.payload, "error");
    });

    builder.addCase(addListToWish.pending, (state, action) => {
      state.wishisLoading = true;
    });
    builder.addCase(addListToWish.fulfilled, (state, action) => {
      state.wishisSuccess = true;
      state.wishisLoading = false;
      state.currentUser = action.payload.data;
      showCustomToast(action.payload.message, "success");
    });
    builder.addCase(addListToWish.rejected, (state, action) => {
      state.wishisSuccess = false;
      showCustomToast(action.payload, "error");
    });
  },
});

export const { handleClearUserAlert, ClearUserInfo } = authSlice.actions;

export default authSlice.reducer;
