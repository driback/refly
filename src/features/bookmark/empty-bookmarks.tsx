import { BookmarkPlus } from "lucide-react";
import { Button } from "~/components/ui/button";
import CreateBookmark from "./create-bookmark";

const EmptyBookmark = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <BookmarkPlus className="mx-auto h-8 w-8" />
      <h2 className="mt-4 font-normal text-lg">No bookmarks yet</h2>
      <div className="mt-6">
        <CreateBookmark
          customTrigger={
            <Button variant="outline" className="text-sm">
              Add Bookmark
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default EmptyBookmark;
