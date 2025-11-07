export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export const users: User[] = [
  {
    id: "1",
    name: "Rico Oktananda",
    email: "rico.oktananda1@gmail.com",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Rico Oktananda",
  },
  {
    id: "2",
    name: "Alicia from Deel",
    email: "alicia@deel.support",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Alicia",
  },
  {
    id: "3",
    name: "Substack Read",
    email: "read@substack.com",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Substack",
  },
  {
    id: "4",
    name: "Jiho from Mobbin",
    email: "jiho@mobbin.com",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Jiho",
  },
  {
    id: "5",
    name: "Medium Daily Digest",
    email: "noreply@medium.com",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Medium",
  },
  {
    id: "6",
    name: "Netflix",
    email: "info@account.netflix.com",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Netflix",
  },
];

export const currentUser = users[0];

