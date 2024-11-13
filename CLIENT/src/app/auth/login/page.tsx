"use client";

import useLoginForm from "client/hooks/useLoginForm";
import AuthForm from "client/components/auth/AuthForm";
import { useAppDispatch } from "client/redux/hooks";
import { login } from "client/redux/features/auth";
import { useRouter } from "next/navigation";

interface LoginCredentials {
  email: string;
  password: string;
}
const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (values: LoginCredentials) => {
    const user = await dispatch(login(values));

    router.push(`/users/profile/${user.payload.user_id}`);
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
