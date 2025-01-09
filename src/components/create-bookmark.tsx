import { PlusIcon } from "lucide-react";
import CreateBookmarkForm from "./create-bookmark-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dotted-dialog";

const CreateBookmark = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-auto size-8">
          <PlusIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
