// components/BookList.js
import React, { useState } from 'react';
import Book from './Book';

const BookList = () => {
  const [books, setBooks] = useState([
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    // Add more books here
  ]);

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div>
      <h1>Book List</h1>
      {books.map((book) => (
        <Book
          key={book.id}
          title={book.title}
          author={book.author}
          onDelete={() => handleDelete(book.id)}
        />
      ))}
    </div>
  );
};

export default BookList;
