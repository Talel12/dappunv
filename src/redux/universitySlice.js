import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UniversityServices from "../services/university.services";

// Async thunk for fetching all universities
export const fetchAllUniversities = createAsyncThunk(
  "universities/fetchAll",
  async () => {
    const response = await UniversityServices.getAllUniversities();
    return response.data;
  }
);

// Async thunk for creating a university
export const createUniversity = createAsyncThunk(
  "universities/create",
  async (university) => {
    const response = await UniversityServices.createUniversity(university);
    return response.data;
  }
);

// Async thunk for fetching a university by ID
export const fetchUniversityById = createAsyncThunk(
  "universities/fetchById",
  async (universityId) => {
    const response = await UniversityServices.getUniversityById(universityId);
    return response.data;
  }
);

// Async thunk for updating a university
export const updateUniversity = createAsyncThunk(
  "universities/update",
  async ({ universityId, university }) => {
    const response = await UniversityServices.updateUniversity(
      universityId,
      university
    );
    return response.data;
  }
);

// Async thunk for deleting a university
export const deleteUniversity = createAsyncThunk(
  "universities/delete",
  async (universityId) => {
    await UniversityServices.deleteUniversity(universityId);
    return universityId; // Return the deleted university ID for the reducer
  }
);

const universitySlice = createSlice({
  name: "universities",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUniversities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUniversities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchAllUniversities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createUniversity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUniversity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createUniversity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUniversityById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUniversityById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = [action.payload];
      })
      .addCase(fetchUniversityById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUniversity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUniversity.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedIndex = state.list.findIndex(
          (university) => university.id === action.payload.id
        );
        if (updatedIndex !== -1) {
          state.list[updatedIndex] = action.payload;
        }
      })
      .addCase(updateUniversity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUniversity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUniversity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter(
          (university) => university.id !== action.payload
        );
      })
      .addCase(deleteUniversity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default universitySlice.reducer;
