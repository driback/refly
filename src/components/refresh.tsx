"use client";

import { RotateCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const Refresh = () => {
  const router = useRouter();

  return (
    <Button variant="ghost" size="icon" className="group size-8" onClick={router.refresh}>
      <RotateCwIcon className="size-4 transition-transform group-active:rotate-90" />
    </Button>
  );
};

export default Refresh;
