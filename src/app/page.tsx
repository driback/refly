import { Suspense } from "react";
import AppHeader from "~/components/app-header";
import AppWrapper from "~/components/app-wrapper";
import SmoothScroll from "~/components/smooth-scroll";
import { BookmarkCardSkeletonList } from "~/features/bookmark/bookmark-card-skeleton";
import BookmarkList from "~/features/bookmark/bookmark-list";
import CreateFolder from "~/features/folder/create-folder";
import FolderList from "~/features/folder/folder-list";
import type { TFindAllBookmarkInput } from "~/server/api/routers/bookmark/bookmark.schema";

type PageProps<T = object> = {
  params: Promise<T>;
  searchParams: Promise<Record<string, string | undefined>>;
};

const Home = async ({ searchParams }: PageProps) => {
  const search = await searchParams;
  const query = search.q;
  const page = search.page;

  const bookmarkListInput: TFindAllBookmarkInput = {
    query,
    page: !page ? 1 : +page,
    limit: 40,
  };

  return (
    <SmoothScroll>
      <AppWrapper>
        <AppHeader />
        <main className="grid grid-cols-3 gap-x-2 gap-y-3">
          <Suspense
            key={JSON.stringify(bookmarkListInput)}
            fallback={<BookmarkCardSkeletonList />}
          >
            <BookmarkList input={bookmarkListInput} />
          </Suspense>
        </main>
        <div className="fixed bottom-0 left-0 z-0 flex h-[100dvh] w-full max-w-[calc(calc(100dvw-60dvw)/2)] flex-col items-center justify-center gap-4">
          <div className="flex w-full flex-col items-end gap-4 p-4">
            <CreateFolder />
            <FolderList />
          </div>
        </div>
      </AppWrapper>
    </SmoothScroll>
  );
};

export default Home;
