/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  console.log(user);

  useEffect(() => {
    // Only run redirect when user state is loaded
    if (isAuthenticated === null) return;

    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    // IMPORTANT FIX:
    // If user is already inside /dashboard/admin or /dashboard/user → NO REDIRECT
    if (
      pathname.includes("/dashboard/admin") ||
      pathname.includes("/dashboard/user")
    ) {
      return;
    }

    // Redirect based on role
    if (user?.role === "admin") {
      router.replace("/dashboard/admin");
    } else {
      router.replace("/dashboard/user");
    }

    setLoading(false);
  }, [user, isAuthenticated, router, pathname]);

  if (loading) return null;

  return null; // nothing renders, it's just a redirect
}
