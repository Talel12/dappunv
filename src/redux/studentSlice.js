import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StudentServices from "../services/student.services";

// Async thunk for fetching all students
export const fetchAllStudents = createAsyncThunk(
  "students/fetchAll",
  async () => {
    const response = await StudentServices.getAllStudents();
    return response.data;
  }
);

// Async thunk for creating a student
export const createStudent = createAsyncThunk(
  "students/create",
  async (student) => {
    const response = await StudentServices.createStudent(student);
    return response.data;
  }
);

// Async thunk for fetching a student by ID
export const fetchStudentById = createAsyncThunk(
  "students/fetchById",
  async (studentId) => {
    const response = await StudentServices.getStudentById(studentId);
    return response.data;
  }
);

// Async thunk for updating a student
export const updateStudent = createAsyncThunk(
  "students/update",
  async ({ studentId, student }) => {
    const response = await StudentServices.updateStudent(studentId, student);
    return response.data;
  }
);

// Async thunk for deleting a student
export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (studentId) => {
    await StudentServices.deleteStudent(studentId);
    return studentId; // Return the deleted student ID for the reducer
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchStudentById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = [action.payload];
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedIndex = state.list.findIndex(
          (student) => student.id === action.payload.id
        );
        if (updatedIndex !== -1) {
          state.list[updatedIndex] = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter(
          (student) => student.id !== action.payload
        );
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default studentSlice.reducer;
