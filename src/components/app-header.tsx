import Link from "next/link";
import CreateBookmark from "../features/bookmark/create-bookmark";
import Refresh from "./refresh";
import SearchField from "./search-field";

const AppHeader = () => {
  return (
    <header className="sticky top-0 left-0 z-10 bg-background/90 backdrop-blur-lg">
      <div className="mx-auto grid max-w-[60dvw] grid-cols-[1fr_2fr_1fr] items-center gap-4 py-4">
        <Link href="/" className="font-semibold text-xl" prefetch={true}>
          Refly
        </Link>
        <SearchField />
        <div className="flex items-center gap-1">
          <CreateBookmark />
          <Refresh />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
