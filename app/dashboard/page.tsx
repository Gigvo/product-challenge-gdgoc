import React from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Suspense } from "react";
import Loading from "./loading";

interface DashboardData {
  totalJobs: number;
  totalCandidates: number;
  newestCandidates: Array<{
    id: number;
    fullName: string;
    createdAt: string;
    job: { id: number; title: string };
  }>;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

async function getDashboardData(): Promise<DashboardData> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("No authentication token found");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/dashboard`, {
    method: "GET",
    cache: "no-store",
    headers: { Cookie: `token=${token}` },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(
      `Failed to fetch dashboard data: ${res.status} - ${errorText}`,
    );
  }

  const result = await res.json();
  if (!result.data) throw new Error("No data in dashboard");
  return result.data as DashboardData;
}

const DashboardContent = async ({
  dataPromise,
}: {
  dataPromise: Promise<DashboardData>;
}) => {
  const data = await dataPromise;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row gap-6 items-center justify-center">
        <div className="rounded-[10px] border-1 border-muted bg-card p-6 flex-1">
          <p>Total Jobs</p>
          <p>{data.totalJobs}</p>
        </div>
        <div className="rounded-[10px] border-1 border-muted bg-card p-6 flex-1">
          <p>Total Candidates</p>
          <p>{data.totalCandidates}</p>
        </div>
      </div>

      <div className="rounded-[10px] border-1 border-muted bg-card">
        <div className="flex flex-row justify-between px-6 py-4 items-center">
          <div>
            <p className="pb-2 font-bold text-2xl">Newest Candidates</p>
            <p className="text-muted-foreground pb-2">Latest Applicant</p>
          </div>
          <Link href={"/candidates"}>
            <Button variant={"ghost"} className="border-1">
              View All <ArrowRight />
            </Button>
          </Link>
        </div>

        <div className="flex flex-col ">
          {data.newestCandidates.map((candidate) => (
            <div key={candidate.id} className="border-t px-6 py-2">
              <div className="flex flex-row justify-between">
                <div>
                  <p>{candidate.fullName}</p>
                  <p className="text-muted-foreground">
                    Applied for {candidate.job.title}
                  </p>
                </div>
                <div className="flex flex-row gap-2 items-center text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <p className="text-muted-foreground">
                    {formatDate(candidate.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const dataPromise = getDashboardData();

  return (
    <DashboardLayout>
      <div className="p-8">
        <h3 className="font-bold text-3xl mb-8">Dashboard</h3>

        <Suspense fallback={<Loading />}>
          <DashboardContent dataPromise={dataPromise} />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
