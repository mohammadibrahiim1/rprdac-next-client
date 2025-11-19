"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    //dynamic redirect based on role
    if (user?.role === "admin") {
      router.replace("/dashboard/admin");
    } else {
      router.replace("/dashboard/user");
    }
  }, [isAuthenticated, router, user?.role]);

  //render nothing until redirect occurs
  if (!isAuthenticated || !user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
