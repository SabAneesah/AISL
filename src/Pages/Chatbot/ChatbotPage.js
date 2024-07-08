import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Sidebar from "./Sidebar";
import ConfirmationModal from "./ConfirmationModal"; // Import the modal component
import { IoIosSend } from "react-icons/io";

function ChatContent() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const [currentChatDocRef, setCurrentChatDocRef] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleChange = async (event) => {
    const newMessage = event.target.value;
    setMessage(newMessage);

    if (currentChatDocRef) {
      try {
        await updateDoc(currentChatDocRef, {
          messages: [...messages, { text: newMessage, sender: "user" }],
        });
      } catch (error) {
        console.error("Error updating document:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message.trim() !== "") {
      const newMessage = { text: message, sender: "user" };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);

      try {
        const response = await axios.get(
          `http://localhost:8000/getSubmitRequest?input_text=${encodeURIComponent(
            message
          )}`
        );
        const botMessage = response.data;

        const updatedMessagesWithBot = [
          ...updatedMessages,
          { text: botMessage, sender: "bot" },
        ];

        setMessages(updatedMessagesWithBot);

        if (currentChatDocRef) {
          try {
            await updateDoc(currentChatDocRef, {
              messages: updatedMessagesWithBot,
            });
          } catch (error) {
            console.error("Error updating document:", error);
          }
        } else {
          try {
            const docRef = await addDoc(collection(db, "chats"), {
              messages: updatedMessagesWithBot,
              timestamp: new Date(),
            });
            setCurrentChatDocRef(docRef);
          } catch (error) {
            console.error("Error adding document:", error);
          }
        }
        fetchChats();
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setMessage("");
    }
  };

  const handleStartNewChat = async () => {
    setMessages([]);
    setCurrentChat(null);
    setCurrentChatDocRef(null);
  };

  const handleSelectChat = async (index) => {
    if (index !== currentChat) {
      setCurrentChat(index);
      setMessages(chats[index]);
    }

    const q = query(collection(db, "chats"));
    try {
      const querySnapshot = await getDocs(q);
      const docRef = querySnapshot.docs[index].ref;
      setCurrentChatDocRef(docRef);
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const handleDeleteChat = async () => {
    const index = deleteIndex;
    try {
      const q = query(collection(db, "chats"));
      const querySnapshot = await getDocs(q);
      const docRef = querySnapshot.docs[index].ref;
      await deleteDoc(docRef);

      const updatedChats = [...chats];
      updatedChats.splice(index, 1);
      setChats(updatedChats);
      setMessages([]);
      setCurrentChat(null);

      if (currentChat === index) {
        setMessages([]);
        setCurrentChat(null);
        setCurrentChatDocRef(null);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const fetchChats = async () => {
    const q = query(collection(db, "chats"));
    try {
      const querySnapshot = await getDocs(q);
      const fetchedChats = querySnapshot.docs.map((doc) => doc.data().messages);
      setChats(fetchedChats);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <>
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleDeleteChat={handleDeleteChat}
      />
      <div className="flex ml-0">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          chats={chats}
          handleStartNewChat={handleStartNewChat}
          handleSelectChat={handleSelectChat}
          handleDeleteChat={(index) => {
            setDeleteIndex(index);
            setShowModal(true);
          }}
          messages={messages}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
        />
        <div
          className={`transition-transform duration-300 m-0 ${
            isSidebarOpen
              ? "ml-[25rem] translate-x-10 "
              : "ml-80 -translate-x-2"
          }`}
          style={{ transition: "margin-left 0.3s" }}
        >
          <div className="flex flex-col mt-[0.27cm] ml-[-2.3cm] w-[30.5cm] h-[18.8cm] p-0 rounded-3xl bg-purple-400 text-white bg-opacity-100 shadow-lg border border-black border-opacity-25">
            <div className="flex items-center p-2 pl-6 bg-purple-800 h-[2cm] mb-0-2 rounded-tl-3xl rounded-tr-3xl">
              <img
                src="bot_icon.png"
                alt="Chat Icon"
                className="w-10 h-10 mr-2"
              />
              <span className="text-lg font-bold">Chatbot</span>
            </div>
            <div className="flex-1 h-[470px] overflow-y-scroll rounded-md bg-transparent no-scrollbar mt-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex my-0 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <img
                      src="bot_icon.png"
                      alt="Bot Icon"
                      className="w-10 h-10 ml-4 mr-2"
                    />
                  )}
                  <p
                    className={`p-2 rounded-lg shadow-md max-w-md text-center break-words leading-snug font-sans ${
                      msg.sender === "user"
                        ? "bg-purple-700 text-white ml-16 font-fira-code"
                        : "bg-gray-200 text-black mr-16 font-fira-code"
                    }`}
                  >
                    {msg.text}
                  </p>
                  {msg.sender === "user" && (
                    <img
                      src="user.png"
                      alt="User Icon"
                      className="w-10 h-10 ml-2 mr-4"
                    />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-3 mt-2 bg-purple-900 rounded-bl-3xl rounded-br-3xl">
              <form className="flex" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="flex-1 p-2 mr-2 text-black border border-gray-300 rounded-xl font-fira-code"
                  placeholder="Type your message..."
                  value={message}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="w-12 pl-3 ml-1 mr-3 text-white transition duration-300 ease-in-out bg-transparent bg-blue-500 border-2 border-white rounded-full border-opacity-1 hover:bg-blue-700"
                >
                  <IoIosSend className="scale-150" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatContent;
