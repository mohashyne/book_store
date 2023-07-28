import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  RESET_VALUE, addBook, fetchBooks, removeBook,
} from '../redux/books/booksSlice';

const BookList = () => {
  const appId = 'Xu8Mz8LlzkO78MLHCMqh';
  const {
    books, loading, error, success, message,
  } = useSelector((state) => state.books);
  console.log(books, loading, error, success, message);
  const dispatch = useDispatch();

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');

  const openAddDialog = () => {
    setAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    setAddDialogOpen(false);
    // Clear the input fields when the dialog is closed
    setTitle('');
    setAuthor('');
    setCategory('');
  };

  useEffect(() => {
    // Fetch the list of books from the server when the component mounts
    dispatch(fetchBooks(appId));
  }, [dispatch]);

  /* eslint-disable camelcase */
  const booksArray = Object.keys(books).map((item_id) => ({
    ...books[item_id][0],
    item_id,
  }));

  const handleAddBook = () => {
    const newBook = {
      item_id: uuidv4(), // Generating a unique ID for the new book
      title,
      author,
      category,
    };

    // dispatch(addBook(newBook));
    dispatch(addBook({ appId, book: newBook }));

    closeAddDialog();
    RESET_VALUE();
  };

  const handleRemoveBook = (itemId) => {
    dispatch(removeBook({ appId, itemId }));
  };

  useEffect(() => {
    if (success || error) {
      const timeoutId = setTimeout(() => {
        dispatch(fetchBooks(appId));
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [dispatch, success, error, appId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <button
        type="button"
        onClick={openAddDialog}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Book
      </button>

      {/* Dialog */}
      {isAddDialogOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-pink bg-opacity-50">
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Add Book</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 mb-2 border"
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="p-2 mb-2 border"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 mb-2 border"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddBook}
                className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Add
              </button>

              <button
                type="button"
                onClick={closeAddDialog}
                className="bg-red-600 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {booksArray?.map((book) => (
          <div key={book.item_id} className="bg-pink-900 p-4 rounded-lg shadow-md">
            <h2 className="text-xl text-white font-bold mb-2">{book.title}</h2>
            <p className="mb-2 text-white">
              <span className="font-bold">Author:</span>
              {' '}
              {book.author}
            </p>
            <p className="mb-2 text-white">
              <span className="font-bold">Category:</span>
              {' '}
              {book.category}
            </p>
            <button
              type="button"
              onClick={() => handleRemoveBook(book.item_id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default BookList;
