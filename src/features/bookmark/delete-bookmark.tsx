"use client";

import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
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

const DeleteBookmark = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { isEmpty, getList, removeAllItems } = useSelectableStore((s) => ({
    isEmpty: s.isEmpty,
    getList: s.getList,
    removeAllItems: s.removeAllItems,
  }));

  const { mutateAsync, isPending } = api.bookmark.delete.useMutation({
    onSuccess: (data) => {
      toast.success(data.messages);
      removeAllItems();
      setOpen(false);
      router.refresh();
    },
    onError: (error) => toast.error(error.message),
  });

  const handleDelete = useCallback(() => {
    const selected = getList();
    void mutateAsync({ ids: selected.map((s) => s.id) });
  }, [getList, mutateAsync]);

  if (isEmpty) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="justify-start">
          <TrashIcon className="mr-2 size-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete bookmark</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this bookmark?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="mr-2">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="destructive" disabled={isPending} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookmark;
