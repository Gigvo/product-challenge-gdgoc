import React from "react";
import Sidebar from "@/components/sidebar";
import DashboardLayout from "@/components/dashboard-layout";
import CandidateCard from "@/components/candidates/candidate-card";
import AddCandidate from "@/components/candidates/add-candidate";

export default function Candidates() {
  return (
    <DashboardLayout>
      <div className="p-8 flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-3xl">Candidates</h3>
            <p className="text-muted-foreground text-[16px]">
              Review and manage candidate applications with AI-powered insights
            </p>
          </div>
          <AddCandidate />
        </div>

        <CandidateCard />
      </div>
    </DashboardLayout>
  );
}
