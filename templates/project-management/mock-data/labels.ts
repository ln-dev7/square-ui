export interface Label {
   id: string;
   name: string;
   color: string;
}

export const labels: Label[] = [
   { id: 'design', name: 'Design', color: 'bg-cyan-100 text-cyan-700' },
   { id: 'marketing', name: 'Marketing', color: 'bg-green-100 text-green-700' },
   { id: 'product', name: 'Product', color: 'bg-pink-100 text-pink-700' },
   { id: 'new-releases', name: 'New releases', color: 'bg-orange-100 text-orange-700' },
   { id: 'new-features', name: 'New features', color: 'bg-purple-100 text-purple-700' },
];

