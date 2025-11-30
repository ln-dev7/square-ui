export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export const users: User[] = [
  {
    id: "1",
    name: "Leonel Ngoya",
    email: "leonelngoya@gmail.com",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=john",
  },
  {
    id: "2",
    name: "LN",
    email: "me@leonelngoya.com",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=sarah",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@mail.com",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike",
  },
  {
    id: "4",
    name: "Emma Davis",
    email: "emma.davis@mail.com",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=emma",
  },
];

export const currentUser = users[0];

