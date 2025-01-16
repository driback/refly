"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "~/components/ui/button";
import { signOut } from "../../configs/auth-client";

const SignOut = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleSignOut = () =>
    startTransition(async () => {
      signOut({ fetchOptions: { onSuccess: router.refresh } });
    });

  return (
    <Button variant="outline" size="sm" onClick={handleSignOut} disabled={isPending}>
      Sign Out
    </Button>
  );
};

export default SignOut;
