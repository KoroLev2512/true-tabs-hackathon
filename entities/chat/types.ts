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
  version: string
  name?: string
  data: string
  timestamp: number
}

export interface JSONSchema {
  data: string
}

export interface ChatState extends ChatProps {
  sendMessage: (message: string) => Promise<Message>
  name: string
  messages: Array<Message>
  schemas: Array<JSONSchemaVersion>
  currentVersionId: number | null
  currentSchema: JSONSchemaVersion | null
  setVersion: (versionId: number) => void
  isLoading: boolean
}
