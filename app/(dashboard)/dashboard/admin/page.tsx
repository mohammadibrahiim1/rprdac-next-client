"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  // Additional protection at page level
  useEffect(() => {
    if (user && user.role !== "user") {
      router.replace("/dashboard/admin");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return <div>Access Denied</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin! This is your dashboard home.</p>
      {/* Add dashboard widgets, charts, etc. */}
    </div>
  );
}
