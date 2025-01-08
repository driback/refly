import AppHeader from "~/components/app-header";
import AppWrapper from "~/components/app-wrapper";
import BookmarkCard from "~/components/bookmark-card";

export default function Home() {
  const items = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <AppWrapper>
      <AppHeader />
      <main className="grid grid-cols-4 gap-x-2 gap-y-3">
        {items.map((i) => (
          <BookmarkCard key={i} />
        ))}
      </main>
    </AppWrapper>
  );
}
