import type { TBookmarkSchema } from "~/server/api/routers/bookmark/bookmark.schema";

import { SquareArrowOutUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FancyClickEffect from "~/components/fancy-click-effect";

const BookmarkCard = (props: TBookmarkSchema) => {
  return (
    <FancyClickEffect>
      <div className="group relative flex h-fit flex-col gap-1 rounded-lg border">
        <Link href={props.url} target="_blank">
          <div className="relative isolate aspect-[4_/_2] size-full rounded-md bg-secondary">
            <Image
              src={props.image!}
              alt={props.title}
              loading="lazy"
              sizes="100%"
              fill
              unoptimized
              className="object-cover"
            />
            <SquareArrowOutUpRightIcon className="absolute top-1 right-1 size-4 scale-50 opacity-0 mix-blend-difference transition-all group-hover:scale-100 group-hover:opacity-100" />
          </div>
        </Link>
        <div className="flex flex-col gap-1 p-1">
          <p className="line-clamp-1 text-balance text-sm" title={props.title}>
            {props.title}
          </p>
          <p
            className="line-clamp-2 truncate text-balance text-[.8rem] text-muted-foreground"
            title={props.description}
          >
            {props.description}
          </p>
          <div className="mt-4 flex items-center">
            <div className="relative size-4 bg-secondary">
              <Image
                src={props.icon!}
                alt={props.title}
                loading="lazy"
                sizes="100%"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </FancyClickEffect>
  );
};

export default BookmarkCard;
