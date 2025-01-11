import { PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dotted-dialog";
import CreateBookmarkForm from "./create-bookmark-form";

const CreateBookmark = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-auto size-8">
          <PlusIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add bookmark</DialogTitle>
          <DialogDescription>Add a bookmark to your collection.</DialogDescription>
        </DialogHeader>
        <CreateBookmarkForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateBookmark;
