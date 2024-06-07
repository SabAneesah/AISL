import React, { useState, useRef, useEffect } from "react";
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
      setMessage("");
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is a dummy reply", sender: "bot" },
        ]);
      }, 500);
    }
  };

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-20 right-5 w-[355px] h-[415px] max-h-full mr-[1.2cm] p-3 pb-4 mt-1 pt-[10] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl bg-purple-600 text-white bg-opacity-95 shadow-lg border border-black border-opacity-25 z-10 text-sm">
      <div className="h-[350px] overflow-y-scroll rounded-md bg-transparent">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={`p-1.5 rounded-md shadow-md w-[160px] my-1 text-center break-words leading-snug font-sans ${
              msg.sender === "user"
                ? "bg-indigo-600  text-white ml-auto mr-0.5"
                : "bg-gray-200 text-black mr-auto ml-0.5"
            }`}
          >
            {msg.text}
          </p>
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
