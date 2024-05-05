import "../styles/ChatPage.css";
import { IoSend } from "react-icons/io5";
import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance.ts";
import LangContext from "../LangContext.ts";
import { FaPlus } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

function ChatPage() {
  const langContext = React.useContext(LangContext);
  const [userMessage, setUserMessage] = useState<string>("");
  const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);
  const [safeMode, setSafeMode] = useState<boolean>(true);
  const [history, setHistory] = useState<ChatHistory>([]);
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [numberOfChats, setNumberOfChats] = useState<number>(1);

  const { locale } = useContext(LangContext);

  const navigate = useNavigate()

  const addMessage = (role: Role, text: string) => {
    setHistory((history) => [
      ...history,
      {
        role,
        response: text,
      },
    ]);
  };

  const changeChat = (chat: number) => {
    setSelectedChat(chat);
    setHistory([]);
    axiosInstance.get(`/get_chat?chat_number=${chat}`).then((r) => {
      if (r == null) return;
      const initial: Message = {
        role: "bot",
        response: "Hello! How can I help you today?"
      };
      const history = r.data
      setHistory([initial, ...history])
    });
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
        addMessage("bot", r.data);
      });
  };

  useEffect(() => {
    axiosInstance.get("/list_all_chat").then((r) => {
      if (r == null) return;
      setNumberOfChats(r.data.length);
      changeChat(r.data.at(-1));
    });
  }, []);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSendClick("user", userMessage);
    setUserMessage("");
  };

  return (
    <div className={"row"}>
      <div className={"col d-flex flex-column gap-3 pt-4 px-5"}>
        {Array(numberOfChats)
          .fill(0)
          .map((_, index) => {
            const chatNumber = index + 1;
            return (
              <button
                key={index}
                onClick={() => {
                  changeChat(chatNumber);
                }}
                className={
                  "select-chat-button " +
                  (chatNumber === selectedChat ? "selected" : "")
                }
              >
                {locale["chat"]} {chatNumber}
              </button>
            );
          })}
        <button
          className={
            "new-chat-button align-items-center justify-content-center d-flex gap-2"
          }
          onClick={() => navigate("/")}
        >
          <FaPlus /> {locale["newChat"]}
        </button>
      </div>
      <div className={"col-2 container-md vh-100 d-flex flex-column w-50"}>
        <div className={"chat-history gap-1"}>
          {history.map(({ role, response }, index) => {
            const changed = history[index - 1]?.role !== role;
            return (
              <div
                className={
                  `message-bubble message-bubble-${role}` +
                  (changed ? "" : ` message-bubble-${role}-cont`)
                }
                key={index}
              >
                {changed && (
                  <div className={"message-role"}>{locale[role]}</div>
                )}
                <div className={"message-text"}>{response}</div>
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
      <div className={"col d-flex flex-column gap-2 pt-4 px-5"}>
        <button className={"select-chat-button lang-btn ms-auto" + (langContext.lang === "en" ? " selected" : "")} onClick={() => langContext.setLang("en")}>
          English
        </button>
        <button className={"select-chat-button lang-btn ms-auto" + (langContext.lang === "es" ? " selected" : "")} onClick={() => langContext.setLang("es")}>
          Español
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
