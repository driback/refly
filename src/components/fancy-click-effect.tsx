"use client";

import { useCallback, useState, type ComponentProps } from "react";

const FancyClickEffect = ({ children, ...rest }: ComponentProps<"div">) => {
  const [isPressed, setIsPressed] = useState<boolean | undefined>();

  const handleMouseDown = useCallback(() => setIsPressed(true), []);
  const handleMouseUpOrLeave = useCallback(() => setIsPressed(false), []);

  const dynamicClass =
    isPressed === undefined
      ? ""
      : isPressed
        ? "bg-black/10 dark:bg-white/10"
        : "animate-fade-out";

  return (
    <div
      className="relative isolate"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUpOrLeave}
      {...rest}
    >
      {children}

      <div
        className={`-z-[1] -inset-1 pointer-events-none absolute rounded-lg text-black/20 dark:text-white/20 ${dynamicClass}`}
      />
    </div>
  );
};

export default FancyClickEffect;
