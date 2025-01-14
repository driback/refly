"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import List from "~/components/list";
import { useFoldersStore } from "./folder-provider";

const FolderList = () => {
  const searchParams = useSearchParams();
  const folders = useFoldersStore((s) => s.folders);
  const foldersArray = Array.from(folders.values());

  const folderId = searchParams.get("folder");

  return (
    <ul className="flex flex-col items-end gap-4">
      <List of={foldersArray}>
        {(folder) => (
          <li
            key={folder.id}
            data-active={folder.id === folderId}
            className="text-sm opacity-70 transition-opacity hover:opacity-100 data-[active=true]:font-medium data-[active=true]:opacity-100"
          >
            <Link href={`/?folder=${folder.id}`} prefetch={true}>
              {folder.name}
            </Link>
          </li>
        )}
      </List>
    </ul>
  );
};

export default FolderList;
