"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // If user is authenticated but no user data, wait
    if (!user) return;

    // Get current path to avoid unnecessary redirects
    const currentPath = window.location.pathname;

    //dynamic redirect based on role
    if (user?.role === "admin" && !currentPath.startsWith("/dashboard/admin")) {
      router.replace("/dashboard/admin");
    } else if (
      user.role === "user" &&
      !currentPath.startsWith("/dashboard/user")
    ) {
      router.replace("/dashboard/user");
    }
  }, [isAuthenticated, router, user, user?.role]);

  //render nothing until redirect occurs
  if (!isAuthenticated || !user) return null;

  // Additional protection: prevent access to admin routes for non-admin users
  if (!isAdmin && window.location.pathname.startsWith("/dashboard/admin")) {
    router.replace("/dashboard/user");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
