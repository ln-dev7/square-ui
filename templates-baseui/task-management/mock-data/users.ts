export interface User {
   id: string;
   name: string;
   email: string;
   avatar: string;
}

export const users: User[] = [
   {
      id: '1',
      name: 'Leonel Ngoya',
      email: 'leonelngoya@gmail.com',
      avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=LeonelNgoya',
   },
   {
      id: '2',
      name: 'LN',
      email: 'me@leonelngoya.com',
      avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=LN',
   },
   {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie@acme.inc',
      avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=CharlieBrown',
   },
   {
      id: '4',
      name: 'Diana Prince',
      email: 'diana@acme.inc',
      avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=DianaPrince',
   },
];

