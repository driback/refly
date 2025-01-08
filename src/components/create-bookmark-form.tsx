"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { api } from "~/trpc/react";
import { InputConform } from "./conform/input-conform";
import { Button } from "./ui/button";
import { DialogClose } from "./ui/dotted-dialog";

const CreateBookmarkFormSchema = z.object({ url: z.string().url() });

const CreateBookmarkForm = () => {
  const { mutateAsync, isPending } = api.bookmark.create.useMutation();

  const [form, fields] = useForm({
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
      <div className="flex items-center justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="outline" disabled={isPending}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isPending}>
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateBookmarkForm;
