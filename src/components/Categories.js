import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryStatus } from '../redux/categories/categoriesSlice';

export default function Categories() {
  const dispatch = useDispatch();
  const categoryStatus = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(getCategoryStatus());
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-5 text-white">Welcome to the Categories Page</h1>
        <p className="text-white">
          Category Status:
          {categoryStatus}
        </p>
      </div>
    </div>
  );
}
