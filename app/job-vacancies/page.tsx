import React from "react";
import DashboardLayout from "@/components/dashboard-layout";
import JobCard from "@/components/jobs/job-card";
import AddJobs from "@/components/jobs/add-job";

export default function JobVacancies() {
  return (
    <DashboardLayout>
      <div className="flex flex-row justify-between items-center mb-4">
        <p className="font-bold text-xl">Job Vacancies</p>
        <AddJobs />
      </div>
      <JobCard />
    </DashboardLayout>
  );
}
