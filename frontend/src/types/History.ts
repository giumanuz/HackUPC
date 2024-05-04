type ChatHistory = {
  messages: Message[]
}

type Message = {
  role: Role,
  text: string,
  timestamp: string
}

type Role = "user" | "gpt"