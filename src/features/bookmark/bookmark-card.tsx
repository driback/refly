import { SquareArrowOutUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "~/lib/utils";
import type { TBookmarkSchema } from "~/server/api/routers/bookmark/bookmark.schema";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const BookmarkImage = ({ src, alt, className }: ImageProps) => (
  <Image
    src={src}
    alt={alt}
    loading="lazy"
    sizes="100%"
    fill
    unoptimized
    className={className}
  />
);

const BookmarkCard = ({ url, image, title, description, icon }: TBookmarkSchema) => {
  const placeholderText =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quas!";

  return (
    <div className="group relative flex h-fit flex-col gap-1 rounded-lg border">
      <Link href={url} target="_blank">
        <div className="relative isolate aspect-[4_/_2] size-full rounded-md bg-secondary">
          <BookmarkImage src={image!} alt={title} className="object-cover" />
        </div>
      </Link>

      <div className="flex h-full flex-col gap-1 p-1">
        <p className="line-clamp-1 text-balance text-sm" title={title}>
          {title}
        </p>

        <p
          className={cn(
            "line-clamp-2 truncate text-balance text-[.8rem] text-muted-foreground",
            !description ? "select-none text-transparent" : "",
          )}
          {...(!description ? {} : { title: description })}
        >
          {description || placeholderText}
        </p>

        <div className="mt-4 flex items-center">
          <div className="relative size-4 bg-secondary">
            <BookmarkImage src={icon!} alt={title} className="object-cover" />
          </div>
          <SquareArrowOutUpRightIcon className="absolute right-1 bottom-1 size-4 scale-50 opacity-0 mix-blend-difference transition-all group-hover:scale-100 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
