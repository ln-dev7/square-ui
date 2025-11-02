export interface User {
   id: string;
   name: string;
   email: string;
   avatar: string;
}

export const users: User[] = [
   {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@acme.inc',
      avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=Alice Johnson',
   },
   {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@acme.inc',
      avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=Bob Smith',
   },
   {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie@acme.inc',
      avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=Charlie Brown',
   },
   {
      id: '4',
      name: 'Diana Prince',
      email: 'diana@acme.inc',
      avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=Diana Prince',
   },
];

