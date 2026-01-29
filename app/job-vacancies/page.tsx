import React from "react";
import DashboardLayout from "@/components/dashboard-layout";
import JobCard from "@/components/jobs/job-card";
import AddJobs from "@/components/jobs/add-job";

export default function JobVacancies() {
  return (
    <DashboardLayout>
      <div className="lg:p-8 max-lg:pt-8">
        <div className="flex flex-row justify-between items-center mb-4 flex-wrap gap-4">
          <h3 className="font-bold lg:text-3xl text-2xl">Job Vacancies</h3>
          <AddJobs />
        </div>
        <JobCard />
      </div>
    </DashboardLayout>
  );
}
