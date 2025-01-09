import List from "./list";

const BookmarkCardSkeleton = () => {
  return (
    <div className="group relative flex h-fit flex-col gap-1 rounded-lg border">
      <div className="aspect-[5_/_3] size-full animate-pulse rounded-md bg-secondary" />
      <p className="line-clamp-1 select-none text-balance text-sm text-transparent">
        Lorem, ipsum.
      </p>
      <p className="line-clamp-2 select-none truncate text-balance text-[.8rem] text-transparent">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <div className="mt-4 flex items-center p-1">
        <div className="relative size-4 animate-pulse bg-secondary" />
      </div>
    </div>
  );
};

export const BookmarkCardSkeletonList = () => {
  const numbers = Array.from({ length: 3 }, (_, i) => i + 1);
  return <List of={numbers}>{(s) => <BookmarkCardSkeleton key={s} />}</List>;
};
