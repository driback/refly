"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import { CheckboxGroupConform } from "~/components/conform/checkbox-group-conform";
import { InputConform } from "~/components/conform/input-conform";
import { Button } from "~/components/ui/button";
import { DialogClose } from "~/components/ui/dotted-dialog";
import { CreateBookmarkInput } from "~/server/api/routers/bookmark/bookmark.schema";
import { api } from "~/trpc/react";
import { useFoldersStore } from "../folder/folder-provider";

const CreateBookmarkFormSchema = CreateBookmarkInput;

const CreateBookmarkForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const getFolders = useFoldersStore((s) => s.getFolders);

  const folders = getFolders();

  const checkboxItems = useMemo(
    () =>
      folders.map((folder) => ({
        name: folder.name,
        value: folder.id,
      })),
    [folders],
  );

  const { mutateAsync, isPending } = api.bookmark.create.useMutation({
    onSuccess: (data) => {
      toast.success(data.messages);
      router.refresh();
    },
    onError: (error, val) => toast.error(`${val.url}: ${error.message}`),
  });

  const [form, fields] = useForm({
    defaultValue: {
      folders: searchParams.get("folder") ? [searchParams.get("folder")] : [],
    },

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateBookmarkFormSchema });
    },

    onSubmit: (event, context) => {
      event.preventDefault();
      const data = parseWithZod(context.formData, { schema: CreateBookmarkFormSchema });
      if (data.status !== "success") {
        return data.reply();
      }

      const parsedData = data.value;
      void mutateAsync(parsedData);
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      className="flex flex-col gap-4"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <InputConform
          type="url"
          meta={fields.url}
          disabled={isPending}
          placeholder="Url"
        />
        {fields.url.errors && (
          <p className="text-[.8rem] text-red-500">{fields.url.errors}</p>
        )}
      </div>
      <div>
        <CheckboxGroupConform
          meta={fields.folders}
          items={checkboxItems}
          disabled={isPending}
        />
      </div>
      <div className="flex items-center justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="outline" disabled={isPending}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default CreateBookmarkForm;
