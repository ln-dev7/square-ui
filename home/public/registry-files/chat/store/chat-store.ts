import { create } from "zustand";
import { mockChats, type Chat, type Message } from "@/mock-data/chats";

interface ChatState {
  chats: Chat[];
  selectedChatId: string | null;
  selectChat: (chatId: string) => void;
  addMessage: (chatId: string, message: Omit<Message, "id" | "timestamp">) => void;
  createNewChat: () => void;
  archiveChat: (chatId: string) => void;
  unarchiveChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: mockChats,
  selectedChatId: null,
  
  selectChat: (chatId) => set({ selectedChatId: chatId }),
  
  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  ...message,
                  id: `msg-${Date.now()}-${Math.random()}`,
                  timestamp: new Date(),
                },
              ],
              updatedAt: new Date(),
            }
          : chat
      ),
    })),
  
  createNewChat: () =>
    set((state) => {
      const newChat: Chat = {
        id: `chat-${Date.now()}`,
        title: "New Conversation",
        icon: "message-circle-dashed",
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isArchived: false,
      };
      return {
        chats: [newChat, ...state.chats],
        selectedChatId: newChat.id,
      };
    }),
  
  archiveChat: (chatId) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, isArchived: true } : chat
      ),
    })),
  
  unarchiveChat: (chatId) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, isArchived: false } : chat
      ),
    })),
  
  deleteChat: (chatId) =>
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== chatId),
      selectedChatId: state.selectedChatId === chatId ? null : state.selectedChatId,
    })),
}));

