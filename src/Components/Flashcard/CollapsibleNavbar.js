import React from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const CollapsibleNavbar = ({ isNavOpen, toggleNav}) => {

    const navigate = useNavigate();
  return (
    <>  
      {/* Arrow icon to toggle the navbar */}
      <button
        className={`fixed top-1/2 left-0 z-50 bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-full shadow-lg transform -translate-y-1/2 ${isNavOpen ? 'ml-64' : ''}`}
        onClick={toggleNav}
      >
        {isNavOpen ? <ChevronLeftIcon className="w-6 h-6" /> : <ChevronRightIcon className="w-6 h-6" />}
      </button>

      {/* Collapsible Navbar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <h2 className="mb-4 text-2xl font-bold">Menu</h2>
          <button
            className="w-full p-3 mb-4 text-white bg-purple-600 rounded-lg hover:bg-purple-500"
            onClick={() => navigate("/flashcardpage")}
          >
            Create Flashcards
          </button>
          <button
            className="w-full p-3 text-white bg-purple-600 rounded-lg hover:bg-purple-500"
            onClick={() => navigate("/viewflashcard")}
          >
            View Flashcards
          </button>
        </div>
      </div>
    </>
  );
};

export default CollapsibleNavbar;
