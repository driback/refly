import type { TFindAllBookmarkInput } from "~/server/api/routers/bookmark/bookmark.schema";

import FancyClickEffect from "~/components/fancy-click-effect";
import List from "~/components/list";
import SelectableWrapper from "~/components/selectable/selectable-wrapper";
import { HydrateClient, api } from "~/trpc/server";
import BookmarkCard from "./bookmark-card";
import EmptyBookmark from "./empty-bookmarks";

const BookmarkList = async ({ input }: { input: TFindAllBookmarkInput }) => {
  const res = await api.bookmark.findAll(input);

  if (!res.length) {
    return <EmptyBookmark />;
  }

  return (
    <HydrateClient>
      <div className="grid grid-cols-bookmark gap-x-2 gap-y-3">
        <List of={res}>
          {(data) => (
            <SelectableWrapper key={data.url} id={data.id} name={data.title}>
              <FancyClickEffect>
                <BookmarkCard {...data} />
              </FancyClickEffect>
            </SelectableWrapper>
          )}
        </List>
      </div>
    </HydrateClient>
  );
};

export default BookmarkList;
