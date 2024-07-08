// src/Pages/GetStartedPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

function GetStartedPage() {
  const navigate = useNavigate();

  const startChatting = () => {
    navigate("/PopUpChatbot");
  };

  return (
    <div className="fixed bottom-20 right-5 w-[365px] h-[435px] max-h-full mr-[1.2cm] p-3 pb-4 mt-1 pt-[10] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl bg-purple-500 text-white bg-opacity-95 shadow-lg border border-black border-opacity-25 z-10 text-sm">
      <div className="flex items-center p-2 mb-2 bg-purple-700 rounded-tl-3xl rounded-tr-3xl">
        <img src="chat_icon.png" alt="Chat Icon" className="w-10 h-10 mr-2" />
        <span className="text-lg font-bold">Welcome!</span>
      </div>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="mb-4">
          Get started with 5 questions free without signing in!
        </p>
        <button
          onClick={startChatting}
          className="p-2 text-white transition duration-300 ease-in-out bg-blue-500 border border-black border-opacity-25 rounded-full hover:bg-blue-700"
        >
          Start Chatting
        </button>
      </div>
    </div>
  );
}

export default GetStartedPage;
