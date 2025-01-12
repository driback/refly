"use client";

import { XIcon } from "lucide-react";
import { useCallback } from "react";
import List from "~/components/list";
import { Button } from "../ui/button";
import { useSelectableStore } from "./selectable-provider";

export const SelectedItems = () => {
  const { list, removeItem } = useSelectableStore((s) => ({
    list: s.list,
    removeItem: s.removeItem,
  }));

  const handleRemoveItem = useCallback((id: string) => removeItem(id), [removeItem]);
  const itemList = Array.from(list.values());

  return (
    <ul className="flex w-full flex-col gap-2 aria-disabled:opacity-50">
      <List of={itemList}>
        {(s) => (
          <li key={s.id} className="grid grid-cols-[auto_1fr] gap-1 text-sm">
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              onMouseDown={() => handleRemoveItem(s.id)}
            >
              <XIcon className="size-4" />
            </Button>
            <span className="line-clamp-1">{s.name}</span>
          </li>
        )}
      </List>
    </ul>
  );
};
