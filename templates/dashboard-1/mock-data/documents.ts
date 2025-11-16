export type Document = {
  id: string;
  name: string;
  size: string;
  author: string;
  authorAvatar: string;
  uploadedAt: string;
  icon: string;
};

export const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Cold Call Scripts",
    size: "90mb",
    author: "Jeremy",
    authorAvatar: "https://api.dicebear.com/9.x/glass/svg?seed=jeremy",
    uploadedAt: "Today",
    icon: "files",
  },
  {
    id: "2",
    name: "Email Template",
    size: "150kb",
    author: "Samantha",
    authorAvatar: "https://api.dicebear.com/9.x/glass/svg?seed=samantha",
    uploadedAt: "Yesterday",
    icon: "mail",
  },
  {
    id: "3",
    name: "Meeting Agenda",
    size: "2mb",
    author: "Alex",
    authorAvatar: "https://api.dicebear.com/9.x/glass/svg?seed=alex",
    uploadedAt: "2 Days Ago",
    icon: "checklist",
  },
  {
    id: "4",
    name: "Project Proposal",
    size: "1.2mb",
    author: "Maya",
    authorAvatar: "https://api.dicebear.com/9.x/glass/svg?seed=maya",
    uploadedAt: "4 Days Ago",
    icon: "file",
  },
  {
    id: "5",
    name: "Feedback Report",
    size: "500kb",
    author: "John",
    authorAvatar: "https://api.dicebear.com/9.x/glass/svg?seed=john",
    uploadedAt: "A Week Ago",
    icon: "files",
  },
  {
    id: "6",
    name: "Sales Presentation",
    size: "3.5mb",
    author: "Emma",
    authorAvatar: "https://api.dicebear.com/9.x/glass/svg?seed=emma",
    uploadedAt: "2 Weeks Ago",
    icon: "files",
  },
  {
    id: "7",
    name: "Client Contract",
    size: "850kb",
    author: "David",
    authorAvatar: "https://api.dicebear.com/9.x/glass/svg?seed=david",
    uploadedAt: "3 Weeks Ago",
    icon: "file",
  },
  {
    id: "8",
    name: "Marketing Plan",
    size: "1.8mb",
    author: "Sophie",
    authorAvatar: "https://api.dicebear.com/9.x/glass/svg?seed=sophie",
    uploadedAt: "1 Month Ago",
    icon: "files",
  },
  {
    id: "9",
    name: "Invoice Template",
    size: "320kb",
    author: "Michael",
    authorAvatar: "https://api.dicebear.com/9.x/glass/svg?seed=michael",
    uploadedAt: "1 Month Ago",
    icon: "mail",
  },
  {
    id: "10",
    name: "Product Roadmap",
    size: "2.1mb",
    author: "Lisa",
    authorAvatar: "https://api.dicebear.com/9.x/glass/svg?seed=lisa",
    uploadedAt: "2 Months Ago",
    icon: "checklist",
  },
  {
    id: "11",
    name: "Budget Report",
    size: "1.5mb",
    author: "Tom",
    authorAvatar: "https://api.dicebear.com/9.x/glass/svg?seed=tom",
    uploadedAt: "2 Months Ago",
    icon: "file",
  },
  {
    id: "12",
    name: "Team Handbook",
    size: "4.2mb",
    author: "Olivia",
    authorAvatar: "https://api.dicebear.com/9.x/glass/svg?seed=olivia",
    uploadedAt: "3 Months Ago",
    icon: "files",
  },
];

