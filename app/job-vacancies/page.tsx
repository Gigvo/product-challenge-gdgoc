import React from "react";
import DashboardLayout from "@/components/dashboard-layout";
import JobCard from "@/components/jobs/job-card";
import AddJobs from "@/components/jobs/add-job";

export default function JobVacancies() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex flex-row justify-between items-center mb-4">
          <h3 className="font-bold text-3xl">Job Vacancies</h3>
          <AddJobs />
        </div>
        <JobCard />
      </div>
    </DashboardLayout>
  );
}
