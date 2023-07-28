import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link,
} from 'react-router-dom';
import Home from './Home';
import Categories from './Categories';

const Navigation = () => (
  <Router>
    <nav className="bg-pink-800 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="logo">
          <span className="text-white font-bold text-xl">Book Store</span>
        </div>
        <ul className="flex space-x-4 text-white font-bold">
          <li>
            <Link to="/" className="text-white hover:text-teal-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/catagories" className="text-white hover:text-teal-200">
              Categories
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/catagories" element={<Categories />} />
    </Routes>
  </Router>
);

export default Navigation;
