import { Suspense } from "react";
import AppHeader from "~/components/app-header";
import AppWrapper from "~/components/app-wrapper";
import { BookmarkCardSkeletonList } from "~/components/bookmark-card-skeleton";
import BookmarkList from "~/components/bookmark-list";
import SmoothScroll from "~/components/smooth-scroll";
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
      </AppWrapper>
    </SmoothScroll>
  );
};

export default Home;
