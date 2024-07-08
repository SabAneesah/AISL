import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function ChatContent() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: "user" },
      ]);
      try {
        const response = await axios.get(
          `http://localhost:8000/getSubmitRequest?input_text=${encodeURIComponent(
            message
          )}`
        );
        const botMessage = response.data;

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botMessage, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setMessage("");
    }
  };

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-20 right-5 w-[365px] h-[435px] max-h-full mr-[1.2cm] p-3 pb-4 mt-1 pt-[10] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl bg-purple-500 text-white bg-opacity-95 shadow-lg border border-black border-opacity-25 z-10 text-sm">
      <div className="flex items-center p-2 mb-2 bg-purple-700 rounded-tl-3xl rounded-tr-3xl">
        <img src="bot_icon.png" alt="Chat Icon" className="w-10 h-10 mr-2" />
        <span className="text-lg font-bold">Chatbot</span>
      </div>
      <div className="h-[300px] overflow-y-scroll rounded-md bg-transparent no-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex my-1 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <img
                src="bot_icon.png"
                alt="Bot Icon"
                className="w-6 h-6 mr-2"
              />
            )}
            <p
              className={`p-1.5 rounded-lg shadow-md w-[160px] text-center break-words leading-snug font-sans ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </p>
            {msg.sender === "user" && (
              <img
                src="user.png"
                alt="User Icon"
                className="w-6 h-6 ml-2"
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="fixed right-auto w-[310px] bg-purple-800 p-1 z-50 rounded-full m-[-1]">
        <form className="flex" onSubmit={handleSubmit}>
          <input
            type="text"
            className="flex-1 p-2 mr-2 text-black border border-gray-300 rounded-full"
            placeholder="Type your message..."
            value={message}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="p-2 ml-1 text-white transition duration-300 ease-in-out bg-blue-500 border border-black border-opacity-25 rounded-full hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

const PopUpChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5">
      <div
        className={`w-12 h-12 rounded-full cursor-pointer flex justify-center items-center transition ease-in-out duration-300 shadow-lg ${
          isOpen
            ? "bg-white-100"
            : "hover:bg-white-200 hover:scale-110 scale-125"
        }`}
        onClick={toggleChatbot}
      >
        <div className="w-full h-full">
          <img
            src={isOpen ? "close_icon.png" : "chat_icon.png"}
            alt="chatIcon"
          />
        </div>
      </div>
      {isOpen && <ChatContent />}
    </div>
  );
};

export default PopUpChatbot;
