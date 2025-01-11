import type { ReactNode } from "react";

const FieldConform = ({
  errors,
  children,
}: { errors?: string | string[]; children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-2">
      {children}
      {errors && <p className="text-[.8rem] text-red-500">{errors}</p>}
    </div>
  );
};

export default FieldConform;
