import React from 'react';
import HomePageImg from "../Assets/Images/HomePageImg.png";

const IntoCard = ({ imageUrl, title, description }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 from-10% via-purple-600 via-50% to-purple-600 to-90% w-full h-96 shadow-lg flex">
      
      <div className="px-6 py-4 flex flex-col justify-center w-1/2">
        <div className="font-bold text-5xl text-white mt-16">Welcome to Edusphere</div>
        <p className="text-gray-300 text-lg mt-4">Make your studies easy, just connect your moodle account and off you go..</p>
      </div>
      
      <div className="w-1/2 flex items-center justify-center">
        <img src={HomePageImg} alt={title} style={{ width: 'auto', height: 'auto' }} />
      </div>
     
    </div>
  );
};

export default IntoCard;
