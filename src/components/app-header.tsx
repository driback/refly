import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "~/configs/auth";
import SignOut from "~/features/auth/sign-out";
import CreateBookmark from "~/features/bookmark/create-bookmark";
import { AppLinks } from "~/lib/constants";
import { Condition } from "./condition";
import Refresh from "./refresh";
import SearchField from "./search-field";
import { Button } from "./ui/button";

const AppHeader = async () => {
  const session = await auth.api.getSession({
    query: { disableCookieCache: true },
    headers: await headers(),
  });

  return (
    <header className="sticky top-0 left-0 z-10 bg-background/90 backdrop-blur-lg">
      <div className="mx-auto grid max-w-[60dvw] grid-cols-3 items-center gap-4 py-4">
        <Link href="/" className="font-semibold text-xl" prefetch={true}>
          Refly
        </Link>
        <SearchField />
        <div className="flex items-center justify-end gap-1">
          <Condition>
            <Condition.If condition={!session}>
              <Button asChild variant="ghost" size="sm">
                <Link href={AppLinks.SignIn}>Sign in</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={AppLinks.SignUp}>Sign up</Link>
              </Button>
            </Condition.If>
            <Condition.Else>
              <CreateBookmark />
              <Refresh />
              <SignOut />
            </Condition.Else>
          </Condition>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
