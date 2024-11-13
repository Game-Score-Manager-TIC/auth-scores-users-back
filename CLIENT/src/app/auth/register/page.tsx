"use client";

import useRegisterForm from "client/hooks/useRegisterForm";
import AuthForm from "client/components/auth/AuthForm";
import { useAppDispatch } from "client/redux/hooks";
import { addUser } from "client/redux/features/users";
import { useRouter } from "next/navigation";
import { login, loginResponse } from "client/redux/features/auth";

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

  const onSubmit = async (values: LoginCredentials | RegisterCredentials) => {
    try {
      if ("name" in values) {
        const userWithRoles = { ...values, roles: ["PLAYER", "ADMIN"] };
        // Esto es un registro, manejar como RegisterCredentials
        await dispatch(addUser(userWithRoles)).unwrap();
        const response = (await dispatch(
          login({ email: values.email, password: values.password })
        )) as { payload: loginResponse };
        router.push(`/users/profile/${response.payload.user_id}`);
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
