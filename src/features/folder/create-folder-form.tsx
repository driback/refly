"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FieldConform from "~/components/conform/field-conform";
import { InputConform } from "~/components/conform/input-conform";
import { Button } from "~/components/ui/button";
import { DialogClose } from "~/components/ui/dotted-dialog";
import { CreateFolderInput } from "~/server/api/routers/folder/folder.schema";
import { api } from "~/trpc/react";

const CreateFolderFormSchema = CreateFolderInput;

const CreateFolderForm = () => {
  const router = useRouter();

  const { mutateAsync, isPending } = api.folder.create.useMutation({
    onSuccess: (_, val) => {
      toast.success(`Folder ${val.folderName} has added to database`);
      router.refresh();
    },
    onError: (error, val) => {
      toast.error(`Folder ${val.folderName}: ${error.message}`);
    },
  });

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateFolderFormSchema });
    },

    onSubmit: (event, context) => {
      event.preventDefault();
      const data = parseWithZod(context.formData, { schema: CreateFolderFormSchema });
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
      <FieldConform errors={fields.folderName.errors}>
        <InputConform
          type="url"
          meta={fields.folderName}
          placeholder="Folder name"
          disabled={isPending}
        />
      </FieldConform>
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

export default CreateFolderForm;
