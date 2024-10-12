import React from "react";
import userIcon from "./assets/user.png";
import modelIcon from "./assets/model.png";
import ReactMarkdown from "react-markdown";
const ChatBubble = ({ sender, content, timestamp, loading }) => {
  return (
    <>
      {/* User Chat  */}
      {sender === "user" && (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="User" src={userIcon} />
            </div>
          </div>
          {/* <div className="chat-header">Anakin</div> */}
          <div className="chat-bubble">{content}</div>
          <div className="chat-footer opacity-50">{timestamp}</div>
        </div>
      )}

      {sender === "model" && (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Model" src={modelIcon} />
            </div>
          </div>
          {/* <div className="chat-header">Model</div> */}
          <div className="chat-bubble">
            {" "}
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          <div className="chat-footer opacity-50">{timestamp}</div>
        </div>
      )}
    </>
  );
};

export default ChatBubble;
