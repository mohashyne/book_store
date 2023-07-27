import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    item_id: 'item1',
    title: 'Life is Short',
    author: 'Ummah Zakiyyah',
    category: 'Religion',
  },
  {
    item_id: 'item2',
    title: 'Hack the Hacker',
    author: 'Thomas Robot',
    category: 'Fiction',
  },
  {
    item_id: 'item3',
    title: 'The Great Deebaters',
    author: 'Malcom X',
    category: 'Literature',
  },
];

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    removeBook: (state, action) => {
      const bookIdToRemove = action.payload.id;
      return state.filter((book) => book.item_id !== bookIdToRemove);
    },
  },
});

export const { addBook, removeBook } = booksSlice.actions;
export default booksSlice.reducer;
