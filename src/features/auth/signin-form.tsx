"use client";

import { LoaderIcon } from "lucide-react";
import { CheckboxConform } from "~/components/conform/checkbox-conform";
import FieldConform from "~/components/conform/field-conform";
import { InputConform } from "~/components/conform/input-conform";
import { Button } from "~/components/ui/button";
import useSignInForm from "./hooks/use-signin-form";

const SingInForm = () => {
  const [form, fields, isPending] = useSignInForm();

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      className="mt-6 flex flex-col gap-4"
      noValidate
    >
      <FieldConform errors={fields.username.errors} key={fields.username.key}>
        <label htmlFor={fields.username.id} className="font-medium text-sm">
          Username
        </label>
        <InputConform
          meta={fields.username}
          type="text"
          placeholder="Enter your username"
          className="w-full p-2"
          disabled={isPending}
        />
      </FieldConform>
      <FieldConform errors={fields.password.errors} key={fields.password.key}>
        <label htmlFor={fields.password.id} className="font-medium text-sm">
          Password
        </label>
        <InputConform
          meta={fields.password}
          type="password"
          placeholder="Enter password"
          className="w-full p-2"
          disabled={isPending}
        />
      </FieldConform>
      <FieldConform
        errors={fields.rememberMe.errors}
        className="flex-row items-center"
        key={fields.rememberMe.key}
      >
        <CheckboxConform meta={fields.rememberMe} disabled={isPending} />
        <label htmlFor={fields.rememberMe.id} className="font-medium text-sm">
          Remember me
        </label>
      </FieldConform>
      <Button variant="outline" type="submit" disabled={isPending} className="mt-6">
        {isPending ? (
          <>
            <LoaderIcon className="mr-2 size-4 animate-spin" /> Going in...
          </>
        ) : (
          "Let's go"
        )}
      </Button>
    </form>
  );
};

export default SingInForm;
