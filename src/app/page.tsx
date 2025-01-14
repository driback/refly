import { Suspense } from "react";
import AppHeader from "~/components/app-header";
import AppWrapper from "~/components/app-wrapper";
import { SelectedItems } from "~/components/selectable/selectable-items";
import { SelectableStoreProvider } from "~/components/selectable/selectable-provider";
import { BookmarkCardSkeletonList } from "~/features/bookmark/bookmark-card-skeleton";
import BookmarkList from "~/features/bookmark/bookmark-list";
import BookmarkToFolder from "~/features/bookmark/bookmark-to-folder";
import DeleteBookmark from "~/features/bookmark/delete-bookmark";
import RemoveBookmarkFromFolder from "~/features/bookmark/remove-bookmark-from-folder";
import CreateFolder from "~/features/folder/create-folder";
import FolderList from "~/features/folder/folder-list";
import type { TFindAllBookmarkInput } from "~/server/api/routers/bookmark/bookmark.schema";

type PageProps<T = object> = {
  params: Promise<T>;
  searchParams: Promise<Record<string, string | undefined>>;
};

const Home = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const search = params.q;
  const page = params.page;
  const folderId = params.folder;

  const bookmarkListInput: TFindAllBookmarkInput = {
    search,
    page: !page ? 1 : +page,
    limit: 40,
    folderId,
  };

  return (
    <SelectableStoreProvider key={folderId}>
      <AppWrapper>
        <AppHeader />
        <div className="mx-auto flex max-w-[60dvw] flex-col">
          <main className="grid w-full flex-1">
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
          <div className="fixed right-0 bottom-0 z-0 flex h-[100dvh] w-full max-w-[calc(calc(100dvw-60dvw)/2)] flex-col items-center justify-center gap-4">
            <div className="flex w-full flex-col items-start gap-4 p-4">
              <SelectedItems />
              <div className="flex flex-col gap-2">
                <BookmarkToFolder />
                <DeleteBookmark />
                <RemoveBookmarkFromFolder />
              </div>
            </div>
          </div>
        </div>
      </AppWrapper>
    </SelectableStoreProvider>
  );
};

export default Home;
