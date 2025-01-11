import Link from "next/link";
import CreateBookmark from "../features/bookmark/create-bookmark";
import Refresh from "./refresh";
import SearchField from "./search-field";

const AppHeader = () => {
  return (
    <header className="sticky top-0 left-0 z-10 grid grid-cols-[1fr_2fr_1fr] items-center gap-4 bg-background/90 py-4 backdrop-blur-lg">
      <Link href="/" className="font-semibold text-xl">
        Refly
      </Link>
      <SearchField />
      <div className="flex items-center gap-1">
        <CreateBookmark />
        <Refresh />
      </div>
    </header>
  );
};

export default AppHeader;
