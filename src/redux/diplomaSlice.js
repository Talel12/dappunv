import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DiplomaServices from "../services/diploma.services";

// Async thunk for fetching all diplomas
export const fetchAllDiplomas = createAsyncThunk(
  "diplomas/fetchAll",
  async () => {
    const response = await DiplomaServices.getAllDiplomas();
    return response.data;
  }
);

// Async thunk for creating a diploma
export const createDiploma = createAsyncThunk(
  "diplomas/create",
  async (diploma) => {
    const response = await DiplomaServices.createDiploma(diploma);
    return response.data;
  }
);

// Async thunk for fetching a diploma by ID
export const fetchDiplomaById = createAsyncThunk(
  "diplomas/fetchById",
  async (diplomaId) => {
    const response = await DiplomaServices.getDiplomaById(diplomaId);
    return response.data;
  }
);

// Async thunk for updating a diploma
export const updateDiploma = createAsyncThunk(
  "diplomas/update",
  async ({ diplomaId, diploma }) => {
    console.log(diploma);
    const response = await DiplomaServices.updateDiploma({
      diplomaId,
      diploma,
    });
    return response.data;
  }
);

// Async thunk for deleting a diploma
export const deleteDiploma = createAsyncThunk(
  "diplomas/delete",
  async (diplomaId) => {
    await DiplomaServices.deleteDiploma(diplomaId);
    return diplomaId; // Return the deleted diploma ID for the reducer
  }
);

const diplomaSlice = createSlice({
  name: "diplomas",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDiplomas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllDiplomas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchAllDiplomas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createDiploma.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDiploma.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createDiploma.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDiplomaById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDiplomaById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = [action.payload];
      })
      .addCase(fetchDiplomaById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateDiploma.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDiploma.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedIndex = state.list.findIndex(
          (diploma) => diploma.id === action.payload.id
        );
        if (updatedIndex !== -1) {
          state.list[updatedIndex] = action.payload;
        }
      })
      .addCase(updateDiploma.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteDiploma.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDiploma.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter(
          (diploma) => diploma.id !== action.payload
        );
      })
      .addCase(deleteDiploma.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default diplomaSlice.reducer;
