import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { signIn } from "~/configs/auth-client";
import { SignInSchema } from "../schema";

const useSignInForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [form, fields] = useForm({
    onValidate: ({ formData }) => parseWithZod(formData, { schema: SignInSchema }),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onSubmit: (event, context) => {
      event.preventDefault();
      const data = parseWithZod(context.formData, { schema: SignInSchema });
      if (data.status !== "success") {
        return data.reply();
      }

      const { username, password, rememberMe } = data.value;
      startTransition(async () => {
        signIn.username({
          username,
          password,
          rememberMe,
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

export default useSignInForm;
