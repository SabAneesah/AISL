import React from "react";
import {
  TiDelete,
  TiArrowRightOutline,
  TiArrowLeftOutline,
} from "react-icons/ti";

function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  chats,
  handleStartNewChat,
  handleSelectChat,
  handleDeleteChat,
  messages,
  currentChat,
  setCurrentChat,
}) {
  return (
    <>
      <button
        className={`fixed top-1/2 transform -translate-y-1/2 z-10 p-2 text-white rounded-full transition-transform duration-300 ml-0 bg-purple-200 border border-gray shadow-lg hover:bg-purple-200 hover:border-gray-400 hover:shadow-xl ${
          isSidebarOpen ? "translate-x-[20rem]" : "translate-x-0"
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <TiArrowLeftOutline className="w-8 h-8 m-0 text-purple-900 hover:text-purple-700" />
        ) : (
          <TiArrowRightOutline className="w-8 h-8 m-0 text-purple-900 hover:text-purple-700" />
        )}
      </button>

      <div
        className={`fixed w-[9cm] h-full bg-purple-700 p-3 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="w-full p-2 mt-4 mb-6 text-white bg-blue-500 rounded-lg shadow-red-500"
          style={{ fontSize: "1.2rem" }}
          onClick={() => messages.length > 0 && handleStartNewChat()}
        >
          + Start New Chat
        </button>
        <div className="p-2 pt-3 overflow-y-scroll no-scrollbar bg-purple-400 h-[38rem] rounded-xl">
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`relative p-2 pl-6 mb-2 text-white rounded-lg cursor-pointer ${
                index === currentChat ? "bg-purple-800" : "bg-purple-600"
              } hover:bg-purple-900`}
              onClick={() => handleSelectChat(index)}
            >
              <span>Chat {index + 1}</span>
              <button
                className="absolute p-1 text-white rounded-full top-1 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteChat(index);
                }}
              >
                <TiDelete className="rounded-full h-7 w-7 border-spacing-2 bg-wite hover:bg-purple-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
