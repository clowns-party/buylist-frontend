import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const userNotAuth =
    (!context.user && !context.loading) ||
    !context.token ||
    Boolean(context.error);
  return { ...context, userNotAuth };
};

export const useAuthRedirect = (to = "/profile") => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push(to);
    }
  }, [user]);
};

export const useAuthGuard = () => {
  const { userNotAuth } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (userNotAuth) {
      router.push("/signin");
    }
  }, [userNotAuth]);
};
