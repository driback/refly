import type { TFindAllBookmarkInput } from "~/server/api/routers/bookmark/bookmark.schema";

import { HydrateClient, api } from "~/trpc/server";
import BookmarkCard from "./bookmark-card";
import List from "./list";

const BookmarkList = async ({ input }: { input: TFindAllBookmarkInput }) => {
  const res = await api.bookmark.findAll(input);

  return (
    <HydrateClient>
      <List of={res}>{(data) => <BookmarkCard key={data.url} {...data} />}</List>
    </HydrateClient>
  );
};

export default BookmarkList;
