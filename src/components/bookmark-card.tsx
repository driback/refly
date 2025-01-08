import { SquareArrowOutUpRightIcon } from "lucide-react";
import FancyClickEffect from "./fancy-click-effect";

const BookmarkCard = () => {
  return (
    <FancyClickEffect>
      <div className="group relative flex h-fit flex-col gap-1 rounded-lg border p-1">
        <div className="relative isolate aspect-square size-full rounded-md bg-secondary">
          <SquareArrowOutUpRightIcon className="absolute top-1 right-1 size-4 scale-50 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100" />
        </div>
        <p className="text-balance text-sm">Lorem, ipsum.</p>
        <p className="line-clamp-2 truncate text-balance text-[.8rem] text-muted-foreground">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus, laborum?
        </p>
        <div className="mt-4 flex items-center">
          <div className="size-4 bg-secondary" />
        </div>
      </div>
    </FancyClickEffect>
  );
};

export default BookmarkCard;
