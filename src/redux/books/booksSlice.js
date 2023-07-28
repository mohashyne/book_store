import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi';
const defaultAppId = 'Xu8Mz8LlzkO78MLHCMqh';

// Define the initial state for the bookstore slice
const initialState = {
  loading: false,
  error: false,
  success: false,
  message: '',
  performingAction: false,
  books: [],
};

// Async Thunks
export const fetchBooks = createAsyncThunk('bookstore/fetchBooks', async (appIdParam) => {
  const appId = appIdParam || defaultAppId; // Use the parameter value or the default value
  try {
    const response = await axios.get(`${BASE_URL}/apps/${appId}/books`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const addBook = createAsyncThunk('bookstore/addNewBook', async ({ appIdParam, book }) => {
  try {
    const appId = appIdParam || defaultAppId;
    const response = await axios.post(`${BASE_URL}/apps/${appId}/books`, book);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const removeBook = createAsyncThunk('bookstore/removeBook', async ({ appIdParam, itemId }) => {
  try {
    const appId = appIdParam || defaultAppId;
    const response = await axios.delete(`${BASE_URL}/apps/${appId}/books/${itemId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

// Bookstore Slice
const booksSlice = createSlice({
  name: 'bookstore',
  initialState,
  reducers: {
    RESET_VALUE(state) {
      state.error = false;
      state.succes = false;
      state.message = '';
      state.performingAction = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
      state.performingAction = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.performingAction = false;
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload?.errors[0];
      state.performingAction = false;
      state.books = [];
    });
    builder.addCase(addBook.pending, (state) => {
      state.performingAction = true;
    });
    builder.addCase(addBook.fulfilled, (state) => {
      state.performingAction = false;
      state.success = true;
    });
    builder.addCase(addBook.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload?.response?.data?.errors[0];
      state.performingAction = false;
    });
    builder.addCase(removeBook.pending, (state) => {
      state.performingAction = true;
    });

    builder.addCase(removeBook.fulfilled, (state) => {
      state.performingAction = false;
      state.success = true;
    });
    builder.addCase(removeBook.rejected, (state, action) => {
      state.error = true;
      state.message = action.payload?.response?.data?.errors[0];
      state.performingAction = false;
    });
  },
});

export const { RESET_VALUE } = booksSlice.actions;
export default booksSlice.reducer;
