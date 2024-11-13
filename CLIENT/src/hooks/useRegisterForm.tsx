import { useState, useEffect, useCallback, useMemo } from "react";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const useRegisterForm = (onSubmit: (values: FormValues) => void) => {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const validateUsername = useCallback((name: string) => {
    return name.length > 0 ? "" : "Username is required";
  }, []);

  const validateEmail = useCallback((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format";
  }, []);

  const validatePassword = useCallback((password: string) => {
    return password.length >= 6
      ? ""
      : "Password must be at least 6 characters long";
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  useEffect(() => {
    setErrors({
      name: validateUsername(values.name),
      email: validateEmail(values.email),
      password: validatePassword(values.password),
    });
  }, [values, validateUsername, validateEmail, validatePassword]);

  const isFormValid = useMemo(() => {
    return !errors.name && !errors.email && !errors.password;
  }, [errors]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isFormValid) {
        onSubmit(values);
      }
    },
    [isFormValid, onSubmit, values]
  );

  return {
    values,
    errors,
    isFormValid,
    handleChange,
    handleSubmit,
  };
};

export default useRegisterForm;
