import { useAppSelector } from "client/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState, FC, ReactNode } from "react";

// Definimos las props que recibirá el WrappedComponent
interface WithAuthProps {
  children: ReactNode; // Permite children como una prop opcional
  [key: string]: unknown; // Permite cualquier prop adicional
}

const withAuth = (
  WrappedComponent: FC<WithAuthProps>,
  requiredRole: string
) => {
  const AuthenticatedComponent: FC<WithAuthProps> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const auth = useAppSelector((state) => state.auth);

    useEffect(() => {
      const roles = auth?.roles || [];

      if (roles.includes(requiredRole)) {
        setIsAuthenticated(true);
      } else {
        router.push("/auth/login");
      }
    }, [router, requiredRole, auth.roles]);

    if (!isAuthenticated) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
