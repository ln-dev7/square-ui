import { FilesContent } from "@/components/files/content";

interface FolderPageProps {
  params: Promise<{ id: string }>;
}

export default async function FolderPage({ params }: FolderPageProps) {
  const { id } = await params;
  return <FilesContent view="folder" folderId={id} />;
}

