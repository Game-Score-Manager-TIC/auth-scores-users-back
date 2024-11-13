import { useState, useEffect, useCallback, useMemo } from "react";

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const useLoginForm = (onSubmit: (values: FormValues) => void) => {
  const [values, setValues] = useState<FormValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  // Función para validar el email
  const validateEmail = useCallback((email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format";
  }, []);

  // Función para validar la contraseña
  const validatePassword = useCallback((password: string): string => {
    return password.length >= 6
      ? ""
      : "Password must be at least 6 characters long";
  }, []);

  // Actualizar los valores del formulario
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  // Validar los campos cada vez que los valores cambian
  useEffect(() => {
    setErrors({
      email: validateEmail(values.email),
      password: validatePassword(values.password),
    });
  }, [values, validateEmail, validatePassword]);

  // Determinar si el formulario es válido
  const isFormValid = useMemo(() => {
    return !errors.email && !errors.password;
  }, [errors]);

  // Manejo del submit del formulario
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

export default useLoginForm;
