import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  getAllRooms,
  getSingleRooms,
  DeleteRoom,
  CreateRoom,
  UpdateRoom,
  getAllRoomsForAdmin,
  getAllSellersListingsStats,
} from "./roomReducer";
const listings = JSON.parse(localStorage.getItem("listing"));
const initialState = {
  rooms: [],
  listing: listings
    ? listings
    : {
        country: "",
        guests: 0,
        bedroom: 0,
        bathroom: 0,
        images: [],
        title: [],
        description: "",
        listingType: "RENT",
        type: "",
        price: "",
        features: [],
        cautionfee: "",
        latitude: "",
        longitude: "",
      },
  room: null,
  stats: {
    villa: 0,
    hotel: 0,
    apartment: 0,
    stay: 0,
    totalListings: 0,
  },
  creatingRoomisLoading: false,
  creatingRoomisSuccess: false,
  creatingRoomisError: false,

  getallRoomisLoading: false,
  getallRoomisSuccess: false,
  getallRoomisError: false,

  deleteRoomisLoading: false,
  deleteRoomisSuccess: false,
  deleteRoomisError: false,

  updateRoomisLoading: false,
  updateRoomisSuccess: false,
  updateRoomisError: false,

  getsingleRoomisLoading: false,
  getsingleRoomisSuccess: false,
  getsingleRoomisError: false,

  getSellerStatsisLoading: false,
  getSellerStatsisSuccess: false,
  getSellerStatsisError: false,
  page: 1,
  search: "",
  limit: "",
  noOfPages: 0,
  totalRooms: 0,
  maxPrice: "",
  startDate: "",
  endDate: "",
  minPrice: "",
  bedroom: 0,
  bathroom: 0,
  title: "",
  type: "",
  country: "",
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    handleFilterState: (state, action) => {
      // console.log(state[action], action., state);
      state[action.payload.type] = action.payload.value;
    },
    handlePage: (state, action) => {
      if (action.payload === "next") {
        state.page =
          state.page === state.noOfPages ? state.noOfPages : state.page + 1;
      }
      if (action.payload === "prev") {
        state.page = state.page === 1 ? 1 : state.page - 1;
      }
    },
    handleClearRoomAlert: (state, action) => {
      state.deleteRoomisLoading = false;
      state.deleteRoomisSuccess = false;
      state.creatingRoomisSuccess = false;
      state.updateRoomisSuccess = false;
      state.room = null;
      state.country = "";
      state.bedroom = "";
      state.title = "";
      state.minPrice = "";
      state.maxPrice = "";
      state.startDate = "";
      state.endDate = "";
    },
    handleListingType: (state, action) => {
      state.listing = {
        ...state.listing,
        type: action.payload,
      };
      localStorage.setItem("listing", JSON.stringify(state.listing));
    },
    handleListingLocation: (state, action) => {
      state.listing = {
        ...state.listing,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        country: action.payload.country,
      };
      localStorage.setItem("listing", JSON.stringify(state.listing));
    },
    handleBasicListing: (state, action) => {
      state.listing = {
        ...state.listing,
        bathroom: action.payload.bathroom,
        bedroom: action.payload.bedroom,
        guests: action.payload.guests,
      };
      localStorage.setItem("listing", JSON.stringify(state.listing));
    },
    handleListingImage: (state, action) => {
      state.listing = {
        ...state.listing,
        images: action.payload,
      };
      localStorage.setItem("listing", JSON.stringify(state.listing));
    },
    handleListingTitle: (state, action) => {
      state.listing = {
        ...state.listing,
        title: action.payload,
      };
      localStorage.setItem("listing", JSON.stringify(state.listing));
    },
    handleListingDescription: (state, action) => {
      state.listing = {
        ...state.listing,
        description: action.payload,
      };
      localStorage.setItem("listing", JSON.stringify(state.listing));
    },
    handleListingDate: (state, action) => {
      state.listing = {
        ...state.listing,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
      localStorage.setItem("listing", JSON.stringify(state.listing));
    },
    handleListingPrice: (state, action) => {
      state.listing = {
        ...state.listing,
        price: action.payload,
      };
      localStorage.setItem("listing", JSON.stringify(state.listing));
    },
  },
  extraReducers: (builder) => {
    // getAllRoomsForAdmin
    builder.addCase(getAllRoomsForAdmin.pending, (state, action) => {
      state.getallRoomisLoading = true;
    });
    builder.addCase(getAllRoomsForAdmin.fulfilled, (state, action) => {
      state.getallRoomisLoading = false;
      // console.log("payload data:", {
      //   data: action.payload
      // })
      const { rooms, noOfPages, totalRooms } = action.payload;
      state.rooms = rooms;
      state.noOfPages = noOfPages;
      state.totalRooms = totalRooms;
      state.getallRoomisLoading = false;
    });
    builder.addCase(getAllRoomsForAdmin.rejected, (state, action) => {
      state.getallRoomisSuccess = false;
      state.getallRoomisLoading = false;
      // toast.error(action.payload);
    });

    builder.addCase(getAllSellersListingsStats.pending, (state, action) => {
      state.getSellerStatsisLoading = true;
    });
    builder.addCase(getAllSellersListingsStats.fulfilled, (state, action) => {
      state.getSellerStatsisLoading = false;
      state.stats = action.payload;
      state.getSellerStatsisLoading = false;
    });
    builder.addCase(getAllSellersListingsStats.rejected, (state, action) => {
      state.getSellerStatsisSuccess = false;
      state.getSellerStatsisLoading = false;
      // toast.error(action.payload);
    });

    // getAllSellersListingsStats getSellerStatsisLoading

    builder.addCase(getAllRooms.pending, (state, action) => {
      state.getallRoomisLoading = true;
    });
    builder.addCase(getAllRooms.fulfilled, (state, action) => {
      state.getallRoomisLoading = false;
      // console.log("payload data:", {
      //   data: action.payload
      // })
      const { data, pagination } = action.payload;
      state.rooms = data;
      state.noOfPages = pagination?.noOfPages;
      state.totalRooms = pagination?.totalRooms;
      state.getallRoomisLoading = false;
    });
    builder.addCase(getAllRooms.rejected, (state, action) => {
      state.getallRoomisSuccess = false;
      state.getallRoomisLoading = false;
      toast.error(action.payload);
    });

    builder.addCase(getSingleRooms.pending, (state, action) => {
      state.getsingleRoomisLoading = true;
    });
    builder.addCase(getSingleRooms.fulfilled, (state, action) => {
      state.getsingleRoomisLoading = false;
      state.room = action.payload;
    });
    builder.addCase(getSingleRooms.rejected, (state, action) => {
      state.getsingleRoomisSuccess = false;
      toast.error(action.payload);
    });

    builder.addCase(CreateRoom.pending, (state, action) => {
      state.creatingRoomisLoading = true;
    });
    builder.addCase(CreateRoom.fulfilled, (state, action) => {
      state.creatingRoomisSuccess = true;
      state.creatingRoomisLoading = false;
      state.room = action.payload;
      toast.success("Room has been created succesfully");
    });
    builder.addCase(CreateRoom.rejected, (state, action) => {
      state.creatingRoomisSuccess = false;
      toast.error(action.payload);
    });

    builder.addCase(DeleteRoom.pending, (state, action) => {
      state.deleteRoomisLoading = true;
    });
    builder.addCase(DeleteRoom.fulfilled, (state, action) => {
      state.deleteRoomisSuccess = true;
      state.deleteRoomisLoading = false;
      state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      toast.success("Room has been deleted");
    });
    builder.addCase(DeleteRoom.rejected, (state, action) => {
      state.deleteRoomisSuccess = false;
      toast.error(action.payload);
    });

    builder.addCase(UpdateRoom.pending, (state, action) => {
      state.updateRoomisLoading = true;
    });
    builder.addCase(UpdateRoom.fulfilled, (state, action) => {
      state.updateRoomisSuccess = true;
      state.updateRoomisLoading = false;
      toast.success("Room has been updated");
    });
    builder.addCase(UpdateRoom.rejected, (state, action) => {
      state.updateRoomisSuccess = false;
      toast.error(action.payload);
    });
  },
});

export const {
  handleClearRoomAlert,
  handlePage,
  handleFilterState,
  handleListingType,
  handleListingLocation,
  handleBasicListing,
  handleListingImage,
  handleListingTitle,
  handleListingDescription,
  handleListingDate,
  handleListingPrice,
} = roomSlice.actions;

export default roomSlice.reducer;
