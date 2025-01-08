import type { ComponentProps } from "react";

import { getInputProps, type FieldMetadata } from "@conform-to/react";
import { Input } from "../ui/input";

export const InputConform = ({
  meta,
  type,
  ...props
}: {
  meta: FieldMetadata<string>;
  type: Parameters<typeof getInputProps>[1]["type"];
} & ComponentProps<typeof Input>) => {
  return <Input {...getInputProps(meta, { type, ariaAttributes: true })} {...props} />;
};
