"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  console.log(user);

  // Additional protection at page level
  useEffect(() => {
    if (user && user?.role !== "admin") {
      router.replace("/dashboard/user");
    }
  }, [user, router]);

  if (!user || user.role !== "user") {
    return <div>Access Denied</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <p>Welcome, User! This is your dashboard home.</p>
      {/* Add dashboard widgets, charts, etc. */}
    </div>
  );
}
