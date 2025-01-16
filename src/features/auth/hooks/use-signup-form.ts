import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { signUp } from "~/configs/auth-client";
import { SignUpSchema } from "../schema";

const useSignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [form, fields] = useForm({
    onValidate: ({ formData }) => parseWithZod(formData, { schema: SignUpSchema }),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onSubmit: (event, context) => {
      event.preventDefault();
      const data = parseWithZod(context.formData, { schema: SignUpSchema });
      if (data.status !== "success") {
        return data.reply();
      }

      const { email, password, username } = data.value;
      startTransition(async () => {
        signUp.email({
          email,
          password,
          name: "",
          username,
          fetchOptions: {
            onError: (ctx) => {
              toast.error(ctx.error.message);
            },
            onSuccess: async () => {
              router.push("/");
            },
          },
        });
      });
    },
  });

  return [form, fields, isPending] as const;
};

export default useSignUpForm;
