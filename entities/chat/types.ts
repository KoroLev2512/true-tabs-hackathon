export interface ChatProps {
  id: number
}

export interface Message {
  id?: number
  text: string
  author: "user" | "gpt"
  timestamp: number
}

export interface JSONSchemaVersion {
  id: number
  name: string
  data: string
}

export interface JSONSchema {
  id: number
  chatID: number
  name: string
  currentVersion: JSONSchemaVersion
}

export interface ChatState extends ChatProps {
  sendMessage: (message: string) => Promise<Message>
  name: string
  messages: Array<Message>
  schemas: Array<JSONSchema>
  currentSchema: JSONSchema | null
}
