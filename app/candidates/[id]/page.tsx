"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileText,
  Loader2,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import DeleteCandidate from "@/components/candidates/delete-candidate";
import DownloadCV from "@/components/candidates/download-cv";

interface Candidate {
  id: number;
  fullName: string;
  email: string;
  skills: string[];
  experienceSummary: string;
  yearsOfExperience: number;
  cvUrl: string;
  aiSummary: string;
  matchScore: number;
  aiReasoning: string;
  jobId: number;
}

interface JobData {
  id: number;
  title: string;
}

export default function CandidateDetails() {
  const params = useParams();
  const router = useRouter();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [Job, setJob] = useState<string>("");

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await fetch(`/api/candidates/${params.id}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch candidate");
        }
        setCandidate(result);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchCandidate();
    }
  }, [params.id]);

  useEffect(() => {
    const fetchJobById = async () => {
      if (!candidate?.jobId) return;
      try {
        const response = await fetch(`/api/job-vacancies`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch job");
        }

        const jobs = result.data || result;
        const foundJob = jobs.find(
          (job: JobData) => job.id === candidate.jobId,
        );
        if (foundJob) {
          setJob(foundJob.title);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJobById();
  }, [candidate?.jobId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-6 h-6 mr-2 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !candidate) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <Button variant="ghost" onClick={() => router.push("/candidates")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Candidates
          </Button>
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error || "Candidate not found"}
          </div>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div className="p-8 text-muted-foreground">
        <Button variant="default" onClick={() => router.push("/candidates")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Candidates
        </Button>
        <div className="flex flex-row justify-between mb-2 mt-8">
          <div className="flex flex-row gap-4">
            <p className="text-card-foreground font-bold text-3xl">
              {candidate.fullName}
            </p>
          </div>

          <div className="flex flex-row gap-4">
            <DownloadCV
              candidateName={candidate.fullName}
              cvUrl={candidate.cvUrl}
            />
            <DeleteCandidate
              candidateId={candidate.id}
              candidateName={candidate.fullName}
            />
          </div>
        </div>
        <p>{candidate.email}</p>
        <div className="flex flex-row gap-4 mt-4">
          <p className="flex items-center">
            <Briefcase className="inline-block mr-2" />
            {candidate.yearsOfExperience} Years of Experience
          </p>
          <p className="flex items-center">
            <FileText className="mr-2 inline-block" />
            {Job}
          </p>
        </div>
        <div className="flex flex-row gap-8 mt-8">
          <div className="flex flex-col gap-4 ">
            <div className="rounded-[10px] border-1 border-muted bg-card p-6">
              <p className="font-bold text-xl text-foreground mb-2">
                Experience Summary
              </p>
              <p className="text-muted-foreground">
                {candidate.experienceSummary}
              </p>
            </div>
            <div className="rounded-[10px] border-1 border-muted bg-card p-6">
              <p className="font-bold text-xl text-foreground mb-2">
                AI Summary
              </p>
              <p className="text-muted-foreground">{candidate.aiSummary}</p>
            </div>
            <div className="rounded-[10px] border-1 border-muted bg-card p-6">
              <p className="font-bold text-xl text-foreground mb-2">
                AI Reasoning
              </p>
              <p className="text-muted-foreground">{candidate.aiReasoning}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div
              className={`p-6 rounded-[8px] flex flex-col gap-2 ${
                candidate.matchScore >= 75
                  ? "bg-accent/50"
                  : candidate.matchScore >= 50
                    ? "bg-yellow-500/50"
                    : "bg-red-500/50"
              }`}
            >
              <div className="flex flex-row gap-2 items-center">
                <Sparkles className="text-card-foreground" />
                <p className="text-card-foreground text-4xl font-bold">
                  {candidate.matchScore}%
                  <span className="text-sm text-muted-foreground ml-2">
                    match
                  </span>
                </p>
              </div>

              {candidate.matchScore >= 90 && (
                <span className="text-sm text-center text-foreground ml-2">
                  Top-tier candidate
                </span>
              )}
              {candidate.matchScore >= 80 && candidate.matchScore < 90 && (
                <span className="text-sm text-foreground ml-2">
                  Excellent candidate
                </span>
              )}
              {candidate.matchScore >= 70 && candidate.matchScore < 80 && (
                <span className="text-sm text-foreground ml-2">Good match</span>
              )}
              {candidate.matchScore >= 50 && candidate.matchScore < 70 && (
                <span className="text-sm text-foreground ml-2">
                  Moderate match
                </span>
              )}
              {candidate.matchScore < 50 && (
                <span className="text-sm text-foreground ml-2">Low match</span>
              )}
            </div>
            <div className="rounded-[10px] border-1 border-muted bg-card p-6">
              <p className="font-bold text-xl text-foreground mb-2">Skills</p>
              {candidate.skills.map((skill) => (
                <Badge className="text-foreground m-1" key={skill}>
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
