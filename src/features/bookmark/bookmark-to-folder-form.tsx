"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { CheckboxGroupConform } from "~/components/conform/checkbox-group-conform";
import { useSelectableStore } from "~/components/selectable/selectable-provider";
import { Button } from "~/components/ui/button";
import { DialogClose } from "~/components/ui/dotted-dialog";
import { type ReactQueryOptions, api } from "~/trpc/react";
import { useFoldersStore } from "../folder/folder-provider";

type Folder = {
  id: string;
  bookmarkIds: string[];
};

const BookmarkToFolderFormSchema = z.object({
  folders: z.array(z.string()).min(1, "Please select at least one folder"),
});

type FormSchema = z.infer<typeof BookmarkToFolderFormSchema>;

const BookmarkToFolderForm = ({
  onSuccess,
  onError,
  ...props
}: ReactQueryOptions["bookmark"]["toFolder"]) => {
  const searchParams = useSearchParams();

  const getFolders = useFoldersStore((s) => s.getFolders);
  const { getList, removeAllItems } = useSelectableStore((s) => ({
    getList: s.getList,
    removeAllItems: s.removeAllItems,
  }));

  const folders = getFolders();
  const bookmarks = getList();

  const checkboxItems = useMemo(
    () =>
      folders.map((folder) => ({
        name: folder.name,
        value: folder.id,
      })),
    [folders],
  );

  const { mutateAsync, isPending } = api.bookmark.toFolder.useMutation({
    onSuccess: (...datas) => {
      toast.success(datas[0].messages);
      removeAllItems();
      onSuccess?.(...datas);
    },
    onError: (...error) => {
      toast.error(error[0].message);
      onError?.(...error);
    },
    ...props,
  });

  const [form, fields] = useForm<FormSchema>({
    defaultValue: {
      folders: searchParams.get("folder") ? [searchParams.get("folder")] : [],
    },
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: BookmarkToFolderFormSchema }),

    async onSubmit(event, context) {
      event.preventDefault();
      const result = parseWithZod(context.formData, {
        schema: BookmarkToFolderFormSchema,
      });

      if (result.status !== "success") {
        return result.reply();
      }

      const bookmarkIds = bookmarks.map((bookmark) => bookmark.id);
      const folder: Folder[] = result.value.folders.map((folderId) => ({
        id: folderId,
        bookmarkIds,
      }));

      try {
        await mutateAsync({ folder });
      } catch (error) {
        console.error("Failed to add bookmarks to folders:", error);
      }
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
        <Button type="submit" disabled={isPending || bookmarks.length === 0}>
          {isPending ? "Adding..." : "Add to Folders"}
        </Button>
      </div>
    </form>
  );
};

export default BookmarkToFolderForm;
