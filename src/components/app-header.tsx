import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
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
import { Input } from "./ui/input";

const AppHeader = () => {
  return (
    <header className="grid grid-cols-[1fr_2fr_1fr] items-center gap-4">
      <Link href="/" className="font-semibold text-xl">
        refly.
      </Link>

      <form className="w-full">
        <div className="relative isolate w-full">
          <SearchIcon className="-translate-y-1/2 absolute top-1/2 left-2 size-4 opacity-80" />
          <Input
            type="text"
            placeholder="Find bookmark"
            className="max-h-8 w-full pl-8"
          />
        </div>
      </form>

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
    </header>
  );
};

export default AppHeader;
