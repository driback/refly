import type { ReactNode } from "react";
import { ReactLenis } from "~/lib/lenis";

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

export default SmoothScroll;
