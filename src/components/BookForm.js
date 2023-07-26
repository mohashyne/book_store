import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const BookForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      const newBook = { title, author };
      onAdd(newBook);
      setTitle('');
      setAuthor('');
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

// Add PropTypes validation for the 'onAdd' prop
BookForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default BookForm;
