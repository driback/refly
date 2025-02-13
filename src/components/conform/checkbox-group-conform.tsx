import { unstable_Control as Control, type FieldMetadata } from "@conform-to/react";
import { Checkbox } from "~/components/ui/checkbox";

export function CheckboxGroupConform({
  meta,
  items,
  disabled,
}: {
  meta: FieldMetadata<string[]>;
  items: Array<{ name: string; value: string }>;
  disabled?: boolean;
}) {
  const initialValue =
    typeof meta.initialValue === "string"
      ? [meta.initialValue]
      : (meta.initialValue ?? []);

  return (
    <>
      {items.map((item) => (
        <Control
          key={item.value}
          meta={{
            key: meta.key,
            initialValue: initialValue.find((v) => v === item.value) ? item.value : "",
          }}
          render={(control) => (
            <div
              className="flex items-center gap-2"
              ref={(element) => {
                control.register(element?.querySelector("input"));
              }}
            >
              <Checkbox
                type="button"
                id={`${meta.name}-${item.value}`}
                name={meta.name}
                value={item.value}
                checked={control.value === item.value}
                onCheckedChange={(value) =>
                  control.change(value.valueOf() ? item.value : "")
                }
                onBlur={control.blur}
                className="focus:ring-2 focus:ring-stone-950 focus:ring-offset-2"
                disabled={disabled}
              />
              <label htmlFor={`${meta.name}-${item.value}`}>{item.name}</label>
            </div>
          )}
        />
      ))}
    </>
  );
}
