"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import data from "../../data.json";

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
    <div className="">
      {/* <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin! This is your dashboard home.</p> */}

      {/* <SectionCards /> */}
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 md:gap-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
