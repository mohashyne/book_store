import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBook, removeBook } from '../redux/books/booksSlice';

const BookList = () => {
  const books = useSelector((state) => state.books);
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

  const handleAddBook = () => {
    const newBook = {
      item_id: `item${books.length + 1}`, // Generating a unique ID for the new book
      title,
      author,
      category,
    };

    dispatch(addBook(newBook));

    closeAddDialog();
  };

  const handleRemoveBook = (bookId) => {
    dispatch(removeBook({ id: bookId }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <button
        type="button"
        onClick={openAddDialog}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Book
      </button>

      {/* Dialog */}
      {isAddDialogOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
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
                className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2"
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
        {books.map((book) => (
          <div key={book.item_id} className="bg-blue-900 p-4 rounded-xl shadow-md">
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
