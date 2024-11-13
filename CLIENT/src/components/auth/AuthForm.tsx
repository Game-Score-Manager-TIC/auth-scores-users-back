"use client";

import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { EyeSlashFilledIcon } from "client/components/ui/EyeSlashFilledIcon";
import { EyeFilledIcon } from "client/components/ui/EyeFilledIcon";
import IconClose from "client/components/ui/close";
import { useState } from "react";
import Link from "next/link";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface AuthFormField {
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
}

interface AuthFormProps {
  title: string;
  onSubmit: (values: LoginCredentials | RegisterCredentials) => void;
  fields: AuthFormField[];
  isRegister: boolean;
  values: LoginCredentials | RegisterCredentials;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFormValid: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  onSubmit,
  fields,
  isRegister,
  values,
  handleChange,
  isFormValid,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed top-[20%] left-[46%] w-auto h-auto flex flex-col gap-4 p-6 bg-gradient-3 shadow rounded-lg"
    >
      <div>
        <div className="flex justify-end">
          <Link href="/">
            <Button
              size="sm"
              isIconOnly
              className="rounded-full w-5 h-5 min-w-0 bg-default-100"
              aria-label="Close"
            >
              <IconClose className="fill-l-grey-e dark:fill-d-grey-e" />
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <h2 className="text-center font-semibold text-xl mb-2">{title}</h2>
        </div>
      </div>

      <div className="flex gap-2">
        {["Google Count", "GitHub Count"].map((text, idx) => (
          <Button key={idx} size="md" className="bg-default-100">
            <span
              className={`size-8 ${
                idx === 0 ? "i-mdi-google" : "i-mdi-github"
              }`}
            />
            {text}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2 items-center">
        {fields.map((field) => (
          <Input
            key={field.name}
            isRequired
            type={field.name === "password" && !isVisible ? "password" : "text"}
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
            variant="flat"
            className="max-w-xs"
            value={values[field.name as keyof typeof values]}
            onChange={handleChange}
            endContent={
              field.name === "password" && (
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="Toggle password visibility"
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              )
            }
            isInvalid={!!field.error}
            errorMessage={field.error}
          />
        ))}

        <Button
          size="lg"
          type="submit"
          variant="flat"
          disabled={!isFormValid}
          className="mt-2"
        >
          {isRegister ? "Register" : "Ingresar"}
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
