import { createSlice } from "@reduxjs/toolkit";
import {
  Createconversation,
  Deleteconversation,
  GetSingleConversation,
  getSellersConversations,
  UserConversationChat,
} from "./conversationReducer";
import toast from "react-hot-toast";
// Define the initial state of the conversation using that type
const initialState = {
  conversationDetails: null,
  userconversationDetails: null,
  conversation: [],
  conversationisLoading: false,
  singleConversationisLoading: false,
  conversationisSuccess: false,
  conversationisError: false,
};

export const conversationSlice = createSlice({
  name: "conversation",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearconversation: (state, action) => {
      state.conversationDetails = null;
      state.conversation = [];
      state.conversationisLoading = false;
      state.isBookMarked = false;
      state.conversationisSuccess = false;
      state.conversationisError = false;
      state.alertText = "";
      state.showAlert = false;
      state.alertType = "";
    },
  },
  extraReducers: (builder) => {
    // // registration build case
    builder.addCase(GetSingleConversation.pending, (state, action) => {
      state.singleConversationisLoading = true;
    });
    builder.addCase(GetSingleConversation.fulfilled, (state, action) => {
      state.conversationisSuccess = true;
      state.singleConversationisLoading = false;
      state.conversationDetails = action.payload;
    });
    builder.addCase(GetSingleConversation.rejected, (state, action) => {
      state.conversationisSuccess = false;
      state.conversationisError = true;
      state.singleConversationisLoading = false;
      toast.error(action.payload);
    });
    // UserConversationChat
    builder.addCase(UserConversationChat.pending, (state, action) => {
      state.conversationisLoading = true;
    });
    builder.addCase(UserConversationChat.fulfilled, (state, action) => {
      state.conversationisSuccess = true;
      state.conversationisLoading = false;
      state.userconversationDetails = action.payload;
    });
    builder.addCase(UserConversationChat.rejected, (state, action) => {
      state.conversationisSuccess = false;
      state.conversationisError = true;
      state.conversationisLoading = false;
      toast.error(action.payload);
    });

    builder.addCase(getSellersConversations.pending, (state, _) => {
      state.conversationisLoading = true;
    });
    builder.addCase(getSellersConversations.fulfilled, (state, action) => {
      state.conversation = action.payload;
      state.conversationisLoading = false;
    });
    builder.addCase(getSellersConversations.rejected, (state, _) => {
      state.conversationisSuccess = false;
      state.conversationisError = true;
      state.conversationisLoading = false;
    });

    // create user conversation
    builder.addCase(Createconversation.pending, (state, action) => {
      state.conversationisLoading = true;
    });
    builder.addCase(Createconversation.fulfilled, (state, action) => {
      state.conversationDetails = action.payload.conversation;
      state.alertText = "conversation created succesfully";
      state.showAlert = true;
      state.conversationisLoading = false;

      state.alertType = "success";
    });
    builder.addCase(Createconversation.rejected, (state, action) => {
      state.conversationisSuccess = false;
      state.conversationisError = true;
      state.conversationisLoading = false;
      toast.error(action.payload);
    });

    // Deleteconversation slice

    builder.addCase(Deleteconversation.pending, (state, action) => {});
    builder.addCase(Deleteconversation.fulfilled, (state, action) => {
      state.conversation = state.conversation.filter(
        (x) => x.id !== action.payload
      );
    });
    builder.addCase(Deleteconversation.rejected, (state, action) => {
      state.conversationisSuccess = false;
      state.conversationisError = true;
      state.conversationisLoading = false;
      toast.error(action.payload);
    });
  },
});

export const { clearconversation } = conversationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.conversation.value

export default conversationSlice.reducer;
