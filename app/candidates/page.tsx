import React from "react";
import DashboardLayout from "@/components/dashboard-layout";
import CandidateCard from "@/components/candidates/candidate-card";
import AddCandidate from "@/components/candidates/add-candidate";
import ExportButton from "@/components/candidates/export-button";

export default function Candidates() {
  return (
    <DashboardLayout>
      <div className="lg:p-8 max-lg:pt-8 flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-2 flex-wrap">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-3xl">Candidates</h3>
            <p className="text-muted-foreground text-[16px]">
              Review and manage candidate applications with AI-powered insights
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <AddCandidate />
            <ExportButton />
          </div>
        </div>

        <CandidateCard />
      </div>
    </DashboardLayout>
  );
}
