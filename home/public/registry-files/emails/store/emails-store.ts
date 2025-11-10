import { create } from "zustand";
import { Email, emails } from "@/mock-data/emails";

interface EmailsState {
  emails: Email[];
  selectedEmailId: string | null;
  currentFolder: string;
  selectEmail: (id: string) => void;
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  toggleStar: (id: string) => void;
  setFolder: (folder: string) => void;
  clearSelectedEmail: () => void;
}

export const useEmailsStore = create<EmailsState>((set) => ({
  emails: emails,
  selectedEmailId: null,
  currentFolder: "inbox",
  
  selectEmail: (id) => set((state) => {
    const email = state.emails.find((e) => e.id === id);
    if (email && !email.read) {
      const updatedEmails = state.emails.map((e) =>
        e.id === id ? { ...e, read: true } : e
      );
      return { emails: updatedEmails, selectedEmailId: id };
    }
    return { selectedEmailId: id };
  }),
  
  markAsRead: (id) => set((state) => ({
    emails: state.emails.map((e) =>
      e.id === id ? { ...e, read: true } : e
    ),
  })),
  
  markAsUnread: (id) => set((state) => ({
    emails: state.emails.map((e) =>
      e.id === id ? { ...e, read: false } : e
    ),
  })),
  
  toggleStar: (id) => set((state) => ({
    emails: state.emails.map((e) =>
      e.id === id ? { ...e, starred: !e.starred } : e
    ),
  })),
  
  setFolder: (folder) => set({ currentFolder: folder }),
  
  clearSelectedEmail: () => set({ selectedEmailId: null }),
}));
