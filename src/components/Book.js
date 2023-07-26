import React from 'react';

import PropTypes from 'prop-types';

const Book = ({ title, author, onDelete }) => (
  <div>
    <h2>{title}</h2>
    <h3>{author}</h3>
    <button onClick={onDelete} type="button">Erase Book</button>
  </div>
);

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Book;
