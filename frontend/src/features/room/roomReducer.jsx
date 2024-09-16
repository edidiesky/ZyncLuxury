"use client";
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
        title,
        limit,
        page,
      } = thunkAPI.getState().room;
      // set a variable for the url
      let roomUrl = `${import.meta.env.VITE_API_BASE_URLS}/room`;
      // create and attach a separator
      // This is a function that modifies the url based on the search parameter
      const AppedQueryUrlParameter = (url, param, value) => {
        // if their is a value append the params value to the url
        if (value) {
          const separator = url.includes("?") ? "&" : "?";
          return `${url}${separator}${param}=${value}`;
        }
        return url;
      };
      // filter based on property country
      if (country !== "") {
        roomUrl = AppedQueryUrlParameter(roomUrl, "country", country);
      }
      // filter based on property bedroom
      if (bathroom !== "") {
        roomUrl = AppedQueryUrlParameter(roomUrl, "bathroom", bathroom);
      }
      // filter based on property type
      if (type !== "") {
        roomUrl = AppedQueryUrlParameter(roomUrl, "type", type);
      }
      // filter based on property minPrice
      if (minPrice !== 0) {
        roomUrl = AppedQueryUrlParameter(roomUrl, "minPrice", minPrice);
      }
      // filter based on property minPrice
      if (limit !== "") {
        roomUrl = AppedQueryUrlParameter(roomUrl, "limit", limit);
      }
      // filter based on property minPrice
      if (minPrice !== "") {
        roomUrl = AppedQueryUrlParameter(roomUrl, "minPrice", minPrice);
      }
      // filter based on property maxPrice
      if (page !== "") {
        roomUrl = AppedQueryUrlParameter(roomUrl, "page", page);
      }
      // filter based on property title
      if (title !== "") {
        roomUrl = AppedQueryUrlParameter(roomUrl, "title", title);
      }
      // filter based on property bedroom
      if (bedroom !== "") {
        roomUrl = AppedQueryUrlParameter(roomUrl, "bedroom", bedroom);
      }
      // filter based on property start date and end Date
      if (startDate !== "Invalid date" && endDate !== "Invalid date") {
        roomUrl = AppedQueryUrlParameter(roomUrl, "startDate", startDate);
        roomUrl = AppedQueryUrlParameter(roomUrl, "endDate", endDate);
      }
      console.log(roomUrl);
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
      const { page, search, limit } = thunkAPI.getState().room;
      let roomUrl = `${import.meta.env.VITE_API_BASE_URLS}/room/admin`;
      if (page) {
        roomUrl = roomUrl + `?page=${page}`;
        const { data } = await axios.get(roomUrl);
        return data;
      } else if (search) {
        roomUrl = roomUrl + `?search=${search}`;
        const { data } = await axios.get(roomUrl);
        return data;
      } else {
        const { data } = await axios.get(roomUrl);
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
      const { data } = await axios.delete(
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
