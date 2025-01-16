import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const AppWrapper = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn("relative isolate min-h-[100dvh] w-[100dvw] pb-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const PageWrapper = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <main className={cn("mx-auto flex max-w-[60dvw] flex-col", className)} {...props}>
      {children}
    </main>
  );
};
