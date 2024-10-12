import React from "react";
import chatLogo from "./assets/icon.png";
import ChatBubble from "./ChatBubble";
import axiosInstance from "./utils/axiosConfig";
import modelIcon from "./assets/model.png";
import { FaGithub } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { uid } from "uid";
const ChatBox = () => {
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [userInput, setUserInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (userInput.trim() === "") return;
    setIsChatOpen(true);

    const userMessage = {
      id: uid(),
      sender: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    axiosInstance
      .post("/chat-api", { message: userInput }) // No need to include the full URL as baseURL is already set
      .then((response) => {
        // Add the AI model's response to chat
        const modelMessage = {
          id: uid(),
          sender: "model",
          content: response.data, // Assuming API returns reply in `data.reply`
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setIsLoading(false);
        setMessages((prevMessages) => [...prevMessages, modelMessage]);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching model response:", error);
      });

    // Clear input field
    setUserInput("");
  };

  return (
    <div className="h-screen bg-base-300  md:w-[70%] w-full relative flex flex-col">
      {!isChatOpen && (
        <div className="flex items-center justify-center flex-col gap-2 mt-40">
          <img
            src={chatLogo}
            alt="Chat Logo"
            className=" w-24 h-24 animate-pulse "
          />
          <h1 className="text-3xl mt-6 font-bold">IntelliChat</h1>

          <p className="mt-2">How Can I Assist You Today?</p>

          <div className="w-full flex items-center justify-center gap-4 mt-2">
            <a href="https://github.com/arbabhassan1" target="_blank">
              <FaGithub className="w-8 cursor-pointer h-8 hover:text-blue-500" />
            </a>
            <a href="https://arbabhassan.bio.link" target="_blank">
              <FaLink className="w-8 cursor-pointer h-8 hover:text-blue-500" />
            </a>
          </div>
        </div>
      )}

      {/* Chat Messages Section */}
      <div className="flex-grow w-full overflow-y-auto px-3 chatBox mb-20 py-10">
        {/* Add chat bubbles here */}
        {messages.map((message) => (
          <ChatBubble
            sender={message.sender}
            content={message.content}
            timestamp={message.timestamp}
            key={message.id}
            loading={isLoading}
          />
        ))}

        {isLoading && (
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="Model" src={modelIcon} />
              </div>
            </div>
            {/* <div className="chat-header">Model</div> */}
            <div className="chat-bubble">
              <span className="loading loading-dots loading-md"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="absolute bottom-4  w-full px-4  md:px-10 left-[50%] translate-x-[-50%]">
        <label className="input input-bordered flex items-center gap-2">
          <input
            onKeyDown={handleKeyPress}
            type="text"
            value={userInput}
            className="grow"
            placeholder="Ask anything..."
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <svg
            onClick={handleSubmit}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-6 w-6 opacity-70 hover:text-blue-600 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <p className=" text-center sm:text-sm text-[13px] mt-2 ">
          IntelliChat can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};

export default ChatBox;
