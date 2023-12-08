import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DirectorServices from "../services/director.services";

// Async thunk for fetching all directors
export const fetchAllDirectors = createAsyncThunk(
  "directors/fetchAll",
  async () => {
    const response = await DirectorServices.getAllDirectors();
    return response.data;
  }
);

// Async thunk for creating a director
export const createDirector = createAsyncThunk(
  "directors/create",
  async (director) => {
    const response = await DirectorServices.createDirector(director);
    return response.data;
  }
);

// Async thunk for fetching a director by ID
export const fetchDirectorById = createAsyncThunk(
  "directors/fetchById",
  async (directorId) => {
    const response = await DirectorServices.getDirectorById(directorId);
    return response.data;
  }
);

// Async thunk for updating a director
export const updateDirector = createAsyncThunk(
  "directors/update",
  async ({ directorId, director }) => {
    const response = await DirectorServices.updateDirector(
      directorId,
      director
    );
    return response.data;
  }
);

// Async thunk for deleting a director
export const deleteDirector = createAsyncThunk(
  "directors/delete",
  async (directorId) => {
    await DirectorServices.deleteDirector(directorId);
    return directorId; // Return the deleted director ID for the reducer
  }
);

const directorSlice = createSlice({
  name: "directors",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDirectors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllDirectors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchAllDirectors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createDirector.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDirector.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createDirector.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDirectorById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDirectorById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = [action.payload];
      })
      .addCase(fetchDirectorById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateDirector.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDirector.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedIndex = state.list.findIndex(
          (director) => director.id === action.payload.id
        );
        if (updatedIndex !== -1) {
          state.list[updatedIndex] = action.payload;
        }
      })
      .addCase(updateDirector.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteDirector.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDirector.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter(
          (director) => director.id !== action.payload
        );
      })
      .addCase(deleteDirector.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default directorSlice.reducer;
