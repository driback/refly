import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

const AppWrapper = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "relative mx-auto flex min-h-[100dvh] w-full max-w-[60dvw] flex-col gap-4 p-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default AppWrapper;
