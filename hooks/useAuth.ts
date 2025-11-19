import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isAdmin = user?.role === "admin";

  return { user, isAuthenticated, isAdmin };
};
