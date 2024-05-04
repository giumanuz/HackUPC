import "../styles/ChatPage.css";
import {IoSend} from "react-icons/io5";
import {useState} from "react";

function formatDate(date: string) {
  return new Date(date).toLocaleString();
}

function ChatPage() {
  const [userMessage, setUserMessage] = useState<string>("");
  const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);
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

  const addMessage = (role: Role, text: string) => {
    setHistory(history => ({
      messages: [
        ...history.messages,
        {
          role,
          text,
          timestamp: new Date().toISOString(),
        },
      ],
    }));
  }

  const handleSendClick = (role: Role, text: string) => {
    if (!text) {
      return;
    }
    addMessage(role, text);
    setWaitingForResponse(true);
    setTimeout(() => {
      addMessage("gpt", "Haha godo (godo)");
      setWaitingForResponse(false);
    }, 2000);
  }

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSendClick("user", userMessage);
    setUserMessage("");
  }

  return (
    <div className={"container-md vh-100 d-flex flex-column w-50"}>
      <div className={"chat-history gap-1"}>
        {history.messages.map(({role, text, timestamp}, index) => {
          const changed = history.messages[index - 1]?.role !== role;
          return (
            <div className={`message-bubble message-bubble-${role}` + (changed ? "" : ` message-bubble-${role}-cont`)} key={index}>
              {changed && <div className={"message-role"}>{role}</div>}
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
      <div className={"mb-5 mt-2"}>
        <form className={"d-flex gap-3"} onSubmit={onFormSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
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
            <IoSend/>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
