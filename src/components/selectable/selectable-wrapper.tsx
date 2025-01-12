"use client";

import { type ReactNode, useCallback, useMemo, useRef } from "react";
import { cn } from "~/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { type SelectableItem, useSelectableStore } from "./selectable-provider";

const SelectableWrapper = ({
  children,
  id,
  name,
}: { children: ReactNode } & SelectableItem) => {
  const list = useSelectableStore((state) => state.list);

  const {
    current: { addItem, removeItem },
  } = useRef(useSelectableStore(({ addItem, removeItem }) => ({ addItem, removeItem })));

  const isSelected = useMemo(() => list.get(id), [list, id]);

  const handleValueChange = useCallback(
    (value: boolean) => {
      if (value) return addItem({ id, name });
      return removeItem(id);
    },
    [id, name],
  );

  const cln = isSelected
    ? "opacity-100 scale-[1.025]"
    : !list.size
      ? "oapcity-100"
      : "opacity-50";

  return (
    <div
      className={cn(
        "group/check relative size-auto h-fit rounded-lg transition-all",
        cln,
      )}
    >
      {children}
      <label
        htmlFor={id}
        className={cn(
          "absolute size-auto cursor-pointer opacity-0 transition-all group-hover/check:opacity-100",
          !list.size
            ? "top-2 left-2 scale-50 group-hover/check:scale-100"
            : "group/label inset-0 p-2",
          !isSelected ? "" : "opacity-100",
        )}
      >
        <Checkbox
          id={id}
          checked={!!isSelected}
          className={cn(
            "size-5 border-secondary bg-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-primary data-[state=checked]:ring-1 data-[state=checked]:ring-secondary-foreground/20",
            !list.size ? "" : "scale-50 group-hover/label:scale-100",
            !isSelected ? "" : "scale-100",
          )}
          onCheckedChange={(val) => handleValueChange(Boolean(val))}
        />
      </label>
    </div>
  );
};

export default SelectableWrapper;
