"use client";

import { Trash2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useSelectableStore } from "~/components/selectable/selectable-provider";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dotted-dialog";
import { api } from "~/trpc/react";

const RemoveBookmarkFromFolder = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const folderId = searchParams.get("folder");

  const { isEmpty, getList, removeAllItems } = useSelectableStore((s) => ({
    isEmpty: s.isEmpty,
    getList: s.getList,
    removeAllItems: s.removeAllItems,
  }));

  const { mutateAsync, isPending } = api.bookmark.remove.useMutation({
    onSuccess: (data) => {
      toast.success(data.messages);
      removeAllItems();
      setOpen(false);
      router.refresh();
    },
    onError: (error) => toast.error(error.message),
  });

  const handleRemove = useCallback(() => {
    const selected = getList();
    if (!(folderId && selected.length)) return;

    void Promise.all(selected.map((s) => mutateAsync({ bookmarkId: s.id, folderId })));
  }, [getList, folderId, mutateAsync]);

  if (isEmpty || !folderId) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="justify-start">
          <Trash2Icon className="mr-2 size-4" />
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove bookmark</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove from this folder?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" disabled={isPending} onClick={handleRemove}>
            {isPending ? "Removing..." : "Remove"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveBookmarkFromFolder;
