import type { ReactNode } from "react";
import { ReactLenis } from "~/lib/lenis";
import { cn } from "~/lib/utils";

const SmoothScroll = ({
  children,
  className,
}: { children: ReactNode; className?: string }) => {
  return (
    <ReactLenis
      root
      className={cn("size-full overflow-y-scroll [&>div]:min-h-full", className)}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
