import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

const AuthFormWrapper = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div className={cn("w-full max-w-[22rem] border p-4", className)} {...props}>
      <h2 className="mb-2 font-bold opacity-80">Refly</h2>
      {children}
    </div>
  );
};

export default AuthFormWrapper;
