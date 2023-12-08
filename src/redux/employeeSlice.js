import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import EmployeeServices from "../services/employee.services";

// Async thunk for fetching all employees
export const fetchAllEmployees = createAsyncThunk(
  "employees/fetchAll",
  async () => {
    const response = await EmployeeServices.getAllEmployees();
    return response.data;
  }
);

// Async thunk for creating an employee
export const createEmployee = createAsyncThunk(
  "employees/create",
  async (user) => {
    const response = await EmployeeServices.createEmployee(user);
    return response.data;
  }
);

// Async thunk for fetching an employee by ID
export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchById",
  async (userId) => {
    const response = await EmployeeServices.getEmployeeById(userId);
    return response.data;
  }
);

// Async thunk for updating an employee
export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ userId, user }) => {
    const response = await EmployeeServices.updateEmployee(userId, user);
    return response.data;
  }
);

// Async thunk for deleting an employee
export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (userId) => {
    await EmployeeServices.deleteEmployee(userId);
    return userId; // Return the deleted user ID for the reducer
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = [action.payload];
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedIndex = state.list.findIndex(
          (user) => user.id === action.payload.id
        );
        if (updatedIndex !== -1) {
          state.list[updatedIndex] = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
