import { FolderPlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dotted-dialog";
import CreateFolderForm from "./create-folder-form";

const CreateFolder = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <FolderPlusIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create folder</DialogTitle>
          <DialogDescription>
            Create a new folder to organize your bookmarks.
          </DialogDescription>
        </DialogHeader>
        <CreateFolderForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolder;
