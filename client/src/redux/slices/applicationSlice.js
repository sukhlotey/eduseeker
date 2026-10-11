import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const applyToCourse = createAsyncThunk(
  'applications/apply',
  async ({ courseId, notes }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/applications/apply/${courseId}`, { notes });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to submit application'
      );
    }
  }
);

export const withdrawSeekerApplication = createAsyncThunk(
  'applications/withdraw',
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await API.put(`/applications/withdraw/${applicationId}`);
      return { applicationId, message: response.data.message };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to withdraw application'
      );
    }
  }
);

export const fetchSeekerApplications = createAsyncThunk(
  'applications/fetchSeeker',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/applications/my-applications');
      return response.data.applications;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to load applications'
      );
    }
  }
);

export const fetchProviderApplications = createAsyncThunk(
  'applications/fetchProvider',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/applications/provider-notifications');
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to load provider applications'
      );
    }
  }
);

export const updateAppStatus = createAsyncThunk(
  'applications/updateStatus',
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/applications/status/${applicationId}`, { status });
      return response.data.application;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update application status'
      );
    }
  }
);

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    seekerApplications: [],
    providerApplications: [],
    unreadCount: 0,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearApplicationState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Apply
      .addCase(applyToCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyToCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.seekerApplications.unshift(action.payload.application);
        state.successMessage = action.payload.message;
      })
      .addCase(applyToCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Withdraw
      .addCase(withdrawSeekerApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(withdrawSeekerApplication.fulfilled, (state, action) => {
        state.loading = false;
        const app = state.seekerApplications.find(
          (a) => a._id === action.payload.applicationId
        );
        if (app) {
          app.status = 'Withdrawn';
        }
        state.successMessage = action.payload.message;
      })
      .addCase(withdrawSeekerApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch seeker apps
      .addCase(fetchSeekerApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSeekerApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.seekerApplications = action.payload;
      })
      .addCase(fetchSeekerApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch provider apps
      .addCase(fetchProviderApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProviderApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.providerApplications = action.payload.applications;
        state.unreadCount = action.payload.unreadCount;
      })
      .addCase(fetchProviderApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update status
      .addCase(updateAppStatus.fulfilled, (state, action) => {
        const index = state.providerApplications.findIndex(
          (a) => a._id === action.payload._id
        );
        if (index !== -1) {
          state.providerApplications[index] = action.payload;
        }
      });
  },
});

export const { clearApplicationState } = applicationSlice.actions;
export default applicationSlice.reducer;
