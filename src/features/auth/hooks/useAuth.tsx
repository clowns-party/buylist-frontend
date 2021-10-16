import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
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
