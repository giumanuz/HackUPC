type ChatHistory = Message[]

type Message = {
  role: Role,
  response: string
}

type Role = "user" | "bot"

type Locale = {
  [key: string]: string
}