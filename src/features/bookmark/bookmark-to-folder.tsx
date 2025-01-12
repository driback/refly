"use client";

import { FolderPlusIcon } from "lucide-react";
import { useState } from "react";
import { useSelectableStore } from "~/components/selectable/selectable-provider";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dotted-dialog";
import BookmarkToFolderForm from "./bookmark-to-folder-form";

const BookmarkToFolder = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isEmpty = useSelectableStore((s) => s.isEmpty);
  if (isEmpty) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="justify-start">
          <FolderPlusIcon className="mr-2 size-4" />
          to folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bookmark to folder</DialogTitle>
          <DialogDescription>
            Add a bookmark to a folder in your collection.
          </DialogDescription>
        </DialogHeader>
        <BookmarkToFolderForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default BookmarkToFolder;
