import "../styles/ChatPage.css";
import { IoSend } from "react-icons/io5";
import React, {useContext, useState} from "react";
import axios from "axios";
import axiosInstance from "../axiosInstance.ts";
import LangContext from "../LangContext.ts";

function formatDate(date: string) {
  return new Date(date).toLocaleString();
}

function ChatPage() {
  const langContext = React.useContext(LangContext);
  const [userMessage, setUserMessage] = useState<string>("");
  const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);
  const [safeMode, setSafeMode] = useState<boolean>(true);
  const [history, setHistory] = useState<ChatHistory>({
    messages: [
      {
        role: "user",
        text: "Hello",
        timestamp: "2021-09-01T12:00:00Z",
      },
      {
        role: "gpt",
        text: "Hi there! How can I help you today?",
        timestamp: "2021-09-01T12:01:00Z",
      },
    ],
  });

  const {locale} = useContext(LangContext)


  const addMessage = (role: Role, text: string) => {
    setHistory((history) => ({
      messages: [
        ...history.messages,
        {
          role,
          text,
          timestamp: new Date().toISOString(),
        },
      ],
    }));
  };

  const handleSendClick = (role: Role, text: string) => {
    if (!text) {
      return;
    }
    addMessage(role, text);
    setWaitingForResponse(true);
    axiosInstance
      .post("/query", {
        query: userMessage,
        safemode: safeMode,
      })
      .catch((error) => {
        console.error("Failed to send message:", error);
        setWaitingForResponse(false);
      })
      .then((r) => {
        setWaitingForResponse(false);
        if (r == null) return;
        addMessage("gpt", r.data);
      });
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSendClick("user", userMessage);
    setUserMessage("");
  };

  return (
    <div className={"container-md vh-100 d-flex flex-column w-50"}>
      <select
        className={"ms-auto p-2 mt-2"}
        value={langContext.lang}
        onChange={(e) => {
          langContext.setLang(e.currentTarget.value);
        }}
      >
        <option value={"en"}>en</option>
        <option value={"es"}>es</option>
      </select>
      <div className={"chat-history gap-1"}>
        {history.messages.map(({ role, text, timestamp }, index) => {
          const changed = history.messages[index - 1]?.role !== role;
          return (
            <div
              className={
                `message-bubble message-bubble-${role}` +
                (changed ? "" : ` message-bubble-${role}-cont`)
              }
              key={index}
            >
              {changed && <div className={"message-role"}>{locale[role]}</div>}
              <div className={"message-text"}>{text}</div>
              <div className={"message-date"}>{formatDate(timestamp)}</div>
            </div>
          );
        })}
        {waitingForResponse && (
          <div className={"message-bubble message-bubble-gpt"}>
            <div className={"message-text thinking"}>Thinking...</div>
          </div>
        )}
      </div>
      <div className={"mb-5 mt-2 d-flex flex-column"}>
        <form className={"d-flex gap-3"} onSubmit={onFormSubmit}>
          <input
            type="text"
            placeholder={locale["messageText"]}
            className={"message-box"}
            value={userMessage}
            onChange={(event) => setUserMessage(event.target.value)}
            disabled={waitingForResponse}
          />
          <button
            type={"submit"}
            className={"send-button"}
            onClick={() => {
              handleSendClick("user", userMessage);
              setUserMessage("");
            }}
            disabled={waitingForResponse}
          >
            <IoSend />
          </button>
        </form>
        <div className={"mt-2 ms-3"}>
          <input
            type={"checkbox"}
            checked={safeMode}
            onChange={(e) => setSafeMode(e.target.checked)}
          />
          <label className={"ms-3 align-items-center justify-content-center"}>
            {locale["safeMode"]}
          </label>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
