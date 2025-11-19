/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    // Only run redirect when user state is loaded
    if (isAuthenticated === null) return;

    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    // Redirect based on role
    if (user.role === "admin") {
      router.replace("/dashboard/admin");
    } else {
      router.replace("/dashboard/user");
    }

    setLoading(false);
  }, [user, isAuthenticated, router]);

  if (loading) return null;

  return null; // nothing renders, it's just a redirect
}
