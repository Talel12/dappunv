// emploiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OffreService from "../services/offre.service";

export const fetchOffres = createAsyncThunk("offres/fetchOffres", async () => {
  try {
    const response = await OffreService.getAllOffres();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createOffre = createAsyncThunk(
  "offres/createOffre",
  async (offre) => {
    try {
      const response = await OffreService.createOffre(offre);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateOffre = createAsyncThunk(
  "offres/updateOffre",
  async ({ offreId, updatedOffre }) => {
    try {
      const response = await OffreService.updateOffre(offreId, updatedOffre);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteOffre = createAsyncThunk(
  "offres/deleteOffre",
  async (offreId) => {
    try {
      await OffreService.deleteOffre(offreId);
      return offreId;
    } catch (error) {
      throw error;
    }
  }
);

const offreSlice = createSlice({
  name: "offres",
  initialState: {
    offres: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffres.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOffres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.offres = action.payload;
      })
      .addCase(fetchOffres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createOffre.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOffre.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.offres.push(action.payload);
      })
      .addCase(createOffre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateOffre.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOffre.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.offres.findIndex(
          (offre) => offre.id === action.payload.id
        );
        if (index !== -1) {
          state.offres[index] = action.payload;
        }
      })
      .addCase(updateOffre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteOffre.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOffre.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.offres = state.offres.filter(
          (offre) => offre.id !== action.payload
        );
      })
      .addCase(deleteOffre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default offreSlice.reducer;
// export { fetchOffres, createOffre, updateOffre, deleteOffre };
