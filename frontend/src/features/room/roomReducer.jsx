import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllRooms = createAsyncThunk(
  "getAllRooms",
  async (name, thunkAPI) => {
    try {
      // perform the filtering based on the filtered conditions
      const {
        type,
        country,
        maxPrice,
        startDate,
        endDate,
        minPrice,
        bedroom,
        bathroom,
        search,
        limit,
        page,
      } = thunkAPI.getState().room;
      // set a variable for the url
      let roomUrl = `${import.meta.env.VITE_API_BASE_URLS}/room`;
      // create and attach a separator
      // Build query parameters dynamically
      const params = new URLSearchParams();

      // It Append non-empty state values as query params
      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);
      if (search) params.append("title", title);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (minPrice) params.append("minPrice", minPrice);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (bedroom) params.append("bedroom", bedroom);
      if (bathroom) params.append("bathroom", bathroom);
      if (type) params.append("type", type);
      if (country) params.append("country", country);

      // appending them to the URL
      if (params.toString()) {
        roomUrl += `?${params.toString()}`;
      }

      // Make the API request
      const { data } = await axios.get(roomUrl);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const getAllRoomsForAdmin = createAsyncThunk(
  "getAllRoomsForAdmin",
  async (name, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      const { page, search, limit } = thunkAPI.getState().room;
      let roomUrl = `${import.meta.env.VITE_API_BASE_URLS}/room/admin`;
      if (page) {
        roomUrl = roomUrl + `?page=${page}`;
        const { data } = await axios.get(roomUrl, config);
        return data;
      } else if (search) {
        roomUrl = roomUrl + `?search=${search}`;
        const { data } = await axios.get(roomUrl, config);
        return data;
      } else {
        const { data } = await axios.get(roomUrl, config);
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
export const getSingleRooms = createAsyncThunk(
  "getSingleRooms",
  async (roomid, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/room/${roomid}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
export const DeleteRoom = createAsyncThunk(
  "DeleteRoom",
  async (roomdataid, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URLS}/room/${roomdataid}`,
        config
      );

      return roomdataid;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
export const CreateRoom = createAsyncThunk(
  "CreateRoom",
  async (roomdata, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/room`,
        roomdata,
        config
      );
      localStorage.removeItem("listing");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
export const UpdateRoom = createAsyncThunk(
  "UpdateRoom",
  async (roomdata, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          authorization: `Bearer ${state.auth.token}`,
        },
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URLS}/room/${state?.room?.room?.id}`,
        roomdata,
        config
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
