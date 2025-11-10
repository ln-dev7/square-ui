export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  verified?: boolean;
}

export const users: User[] = [
  {
    id: "1",
    name: "Rico Oktananda",
    email: "rico.oktananda1@gmail.com",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Rico Oktananda",
    verified: true,
  },
  {
    id: "2",
    name: "Alicia from Deel",
    email: "alicia@deel.support",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Alicia",
    verified: true,
  },
  {
    id: "3",
    name: "Substack Read",
    email: "read@substack.com",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Substack",
    verified: false,
  },
  {
    id: "4",
    name: "Jiho from Mobbin",
    email: "jiho@mobbin.com",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Jiho",
    verified: true,
  },
  {
    id: "5",
    name: "Medium Daily Digest",
    email: "noreply@medium.com",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Medium",
    verified: true,
  },
  {
    id: "6",
    name: "Netflix",
    email: "info@account.netflix.com",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Netflix",
    verified: false,
  },
];

export const currentUser = users[0];
