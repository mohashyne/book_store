import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, removeBook } from '../redux/books/booksSlice';

const Book = ({ title, author, onDelete }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    if (storedBooks) {
      dispatch({ type: 'books/addBook', payload: storedBooks });
    }
  }, [dispatch]);

  const handleDelete = () => {
    setIsDeleted(true);
    onDelete();

    dispatch(removeBook({ id: onDelete }));
    localStorage.setItem('books', JSON.stringify(books));
  };

  const handleAddBook = () => {
    const bookToAdd = {
      id: Date.now(),
      title: newBook.title,
      author: newBook.author,
    };

    dispatch(addBook(bookToAdd));
    setIsAdding(false);

    localStorage.setItem('books', JSON.stringify([...books, bookToAdd]));
  };

  return (
    !isDeleted && (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-900 shadow-md rounded-md p-4 mb-4 text-center" style={{ width: '33vw', height: '35vh' }}>
          <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
          <p className="text-white pt-5">
            Author:
            {' '}
            {author}
          </p>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md mt-10"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md mt-10 ml-2"
            onClick={() => setIsAdding(true)}
          >
            Add New Book
          </button>
        </div>

        {isAdding && (
          <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Add New Book</h2>
              <input
                type="text"
                placeholder="Title"
                className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Author"
                className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              />
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 mr-2"
                onClick={handleAddBook}
              >
                Add Book
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Book;
