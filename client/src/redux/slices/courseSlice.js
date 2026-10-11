import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchAllCourses = createAsyncThunk(
  'courses/fetchAll',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.mode) params.append('mode', filters.mode);
      if (filters.providerType) params.append('providerType', filters.providerType);
      if (filters.instituteId) params.append('instituteId', filters.instituteId);

      const response = await API.get(`/courses?${params.toString()}`);
      return response.data.courses;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch courses');
    }
  }
);

export const fetchInstitutes = createAsyncThunk(
  'courses/fetchInstitutes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/courses/institutes');
      return response.data.institutes;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch institutes');
    }
  }
);

export const fetchProviderCourses = createAsyncThunk(
  'courses/fetchProviderCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/courses/my-courses');
      return response.data.courses;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch your courses');
    }
  }
);

export const createNewCourse = createAsyncThunk(
  'courses/create',
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await API.post('/courses', courseData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create course');
    }
  }
);

export const updateCourse = createAsyncThunk(
  'courses/update',
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/courses/${id}`, courseData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update course');
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/courses/${id}`);
      return { id, message: response.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete course');
    }
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    institutes: [],
    providerCourses: [],
    loading: false,
    error: null,
    actionSuccess: null,
  },
  reducers: {
    clearCourseActionState: (state) => {
      state.error = null;
      state.actionSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all courses
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch institutes
      .addCase(fetchInstitutes.fulfilled, (state, action) => {
        state.institutes = action.payload;
      })
      // Fetch provider's own courses
      .addCase(fetchProviderCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProviderCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.providerCourses = action.payload;
      })
      .addCase(fetchProviderCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create course
      .addCase(createNewCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.providerCourses.unshift(action.payload.course);
        state.actionSuccess = action.payload.message;
      })
      .addCase(createNewCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update course
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.providerCourses.findIndex(
          (c) => c._id === action.payload.course._id
        );
        if (index !== -1) {
          state.providerCourses[index] = action.payload.course;
        }
        state.actionSuccess = action.payload.message;
      })
      // Delete course
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.providerCourses = state.providerCourses.filter(
          (c) => c._id !== action.payload.id
        );
        state.actionSuccess = action.payload.message;
      });
  },
});

export const { clearCourseActionState } = courseSlice.actions;
export default courseSlice.reducer;
