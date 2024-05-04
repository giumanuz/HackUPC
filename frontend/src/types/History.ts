type ChatHistory = {
  messages: Message[]
}

type Message = {
  role: Role,
  text: string,
  timestamp: string
}

type Role = "user" | "gpt"

type Locale = {
  [key: string]: string
}