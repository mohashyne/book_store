import React from 'react';
import Book from './Book';

export default function Home() {
  return (
    <>
      <Book title="Sample Book" author="Sample Author" onDelete={() => {}} />
    </>
  );
}
