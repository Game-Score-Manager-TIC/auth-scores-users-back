"use client";

import useRegisterForm from "client/hooks/useRegisterForm";
import AuthForm from "client/components/auth/AuthForm";
import { useAppDispatch } from "client/redux/hooks";
import { addUser } from "client/redux/features/users";
import { useRouter } from "next/navigation";
import { login, loginResponse } from "client/redux/features/auth";
import { useState } from "react";
import { Spinner } from "@nextui-org/react";

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: LoginCredentials | RegisterCredentials) => {
    setIsLoading(true);
    try {
      if ("name" in values) {
        const userWithRoles = { ...values, roles: ["PLAYER"] };
        // Esto es un registro, manejar como RegisterCredentials
        await dispatch(addUser(userWithRoles)).unwrap();
        const response = (await dispatch(
          login({ email: values.email, password: values.password })
        )) as { payload: loginResponse };
        setTimeout(() => {
          // After 5 seconds, redirect to the user's profile
          router.push(`/users/profile/${response.payload.user_id}`);
        }, 2000); 
      }
      // Si es LoginCredentials, manejar el inicio de sesión (aunque no tienes código para ello aquí)
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  const { values, errors, isFormValid, handleChange } =
    useRegisterForm(onSubmit);

  const fields = [
    {
      name: "name",
      label: "Username",
      error: errors.name,
      placeholder: "Enter your username",
    },
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
      title="Registro"
      onSubmit={onSubmit}
      fields={fields}
      isRegister={true}
      values={values}
      handleChange={handleChange}
      isFormValid={isFormValid}
    />
  );
};

export default RegisterPage;
