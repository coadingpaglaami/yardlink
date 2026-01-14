export interface Message {
  id: number; // Unique identifier for the message
  name: string; // Name of the person who sent the message
  email: string; // Email of the sender
  message: string; // The content of the message
  status: "New" | "Replied" | "Read"; // Status of the message (e.g., "New", "Replied")
  created_at: string; // Timestamp of when the message was created
  replied_at: string | null; // Timestamp of when the message was replied to (null if not replied)
}

export interface MessageResponse {
  count: number; // The total count of messages
  results: Message[]; // Array of messages
}

export interface MessageParams {
  page?: number;
  limit?: number;
  search?: string;
}
