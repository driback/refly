import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

const AppWrapper = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn("relative isolate min-h-[100dvh] w-[100dvw] pb-4", className)}
      {...props}
    >
      <div className="mx-auto flex size-full max-w-[60dvw] flex-col">{children}</div>
    </div>
  );
};

export default AppWrapper;
