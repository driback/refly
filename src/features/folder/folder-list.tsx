import Link from "next/link";
import List from "~/components/list";
import { api } from "~/trpc/server";

const FolderList = async () => {
  const res = await api.folder.findAll();

  return (
    <ul className="flex flex-col items-end gap-4">
      <List of={res}>
        {(folder) => (
          <li
            key={folder.id}
            className="text-sm opacity-80 transition-opacity hover:opacity-100"
          >
            <Link href={`/?folder=${folder.id}`}>{folder.name}</Link>
          </li>
        )}
      </List>
    </ul>
  );
};

export default FolderList;
