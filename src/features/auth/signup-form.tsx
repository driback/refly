"use client";

import type { FieldMetadata } from "@conform-to/react";
import { Check, LoaderIcon, X } from "lucide-react";
import { useDeferredValue, useState } from "react";
import FieldConform from "~/components/conform/field-conform";
import { InputConform } from "~/components/conform/input-conform";
import { Button } from "~/components/ui/button";
import useSignUpForm from "./hooks/use-signup-form";

const SignUpForm = () => {
  const [form, fields, isPending] = useSignUpForm();

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
      <FieldConform errors={fields.email.errors} key={fields.email.key}>
        <label htmlFor={fields.email.id} className="font-medium text-sm">
          Email address
        </label>
        <InputConform
          meta={fields.email}
          type="email"
          placeholder="Enter your email"
          className="w-full p-2"
          disabled={isPending}
        />
      </FieldConform>

      <InputPasswordField field={fields.password} isPending={isPending} />

      <Button variant="outline" type="submit" disabled={isPending} className="mt-6">
        {isPending ? (
          <>
            <LoaderIcon className="mr-2 size-4 animate-spin" /> Creating...
          </>
        ) : (
          "Create an account"
        )}
      </Button>
    </form>
  );
};

export default SignUpForm;

const checkStrength = (pass: string) => {
  const requirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[0-9]/, text: "At least 1 number" },
    { regex: /[a-z]/, text: "At least 1 lowercase letter" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  ];

  return requirements.map((req) => ({
    met: req.regex.test(pass),
    text: req.text,
  }));
};

const InputPasswordField = ({
  field,
  isPending,
}: { field: FieldMetadata<string>; isPending: boolean }) => {
  const [password, setPassword] = useState("");
  const deferedPassword = useDeferredValue(password);
  const strength = checkStrength(deferedPassword);

  return (
    <FieldConform key={field.key}>
      <label htmlFor={field.id} className="font-medium text-sm">
        Password
      </label>
      <InputConform
        meta={field}
        type="password"
        placeholder="Enter password"
        className="w-full p-2"
        onChange={(e) => setPassword(e.target.value)}
        disabled={isPending}
      />

      <ul className="space-y-1.5" aria-label="Password requirements">
        {strength.map((req) => (
          <li key={req.text} className="flex items-center gap-2">
            {req.met ? (
              <Check size={16} className="text-emerald-500" aria-hidden="true" />
            ) : (
              <X size={16} className="text-muted-foreground/80" aria-hidden="true" />
            )}
            <span
              className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </FieldConform>
  );
};
