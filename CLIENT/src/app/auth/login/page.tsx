"use client";

import useLoginForm from "client/hooks/useLoginForm";
import AuthForm from "client/components/auth/AuthForm";
import { useAppDispatch } from "client/redux/hooks";
import { login } from "client/redux/features/auth";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import { useState } from "react";

interface LoginCredentials {
  email: string;
  password: string;
}
const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: LoginCredentials) => {
    setIsLoading(true);
    const user = await dispatch(login(values));
    setTimeout(() => {
      // After 5 seconds, redirect to the user's profile
      router.push(`/users/profile/${user.payload.user_id}`);
    }, 2000); 

  };
  const { values, errors, isFormValid, handleChange } = useLoginForm(onSubmit);

  const fields = [
    {
      name: "email",
      label: "Email",
      error: errors.email,
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      error: errors.password,
      placeholder: "Enter your password",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <AuthForm
      title="Iniciar Sesión"
      onSubmit={onSubmit}
      fields={fields}
      isRegister={false}
      values={values}
      handleChange={handleChange}
      isFormValid={isFormValid}
    />
  );
};

export default LoginPage;
