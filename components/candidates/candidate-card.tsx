import React from "react";
import ViewCandidate from "./view-candidate";
import DeleteCandidate from "./delete-candidate";
import DownloadCV from "./download-cv";
import { Badge } from "../ui/badge";
import { Briefcase, FileText, Sparkles } from "lucide-react";

interface CandidateData {
  id: number;
  fullName: string;
  email: string;
  skills: string[];
  experienceSummary: string;
  yearsOfExperience: number;
  cvUrl: string;
  matchScore: number;
  jobId: number;
}

interface JobData {
  id: number;
  title: string;
}

async function getCandidates(): Promise<CandidateData[]> {
  const response = await fetch(
    "https://ai-recruitment-backend-gdgoc.vercel.app/api/candidates",
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch candidates");
  }
  const results = await response.json();
  return results.data || results;
}

async function getJobsById(): Promise<JobData[]> {
  const response = await fetch(
    "https://ai-recruitment-backend-gdgoc.vercel.app/api/job-vacancies",
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  const results = await response.json();
  return results.data || results;
}

export default async function CandidateCard() {
  const [candidates, jobs] = await Promise.all([
    getCandidates(),
    getJobsById(),
  ]);

  const jobMap = new Map(jobs.map((job) => [job.id, job.title]));
  return (
    <div>
      {candidates.map((candidate: CandidateData) => (
        <div
          key={candidate.id}
          className="border p-6 mb-4 rounded-lg shadow-md text-muted-foreground bg-card flex flex-col gap-2"
        >
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-card-foreground">
                {candidate.fullName}
              </h2>
              <p>{candidate.email}</p>
            </div>
            <div className="flex flex-row flex-wrap gap-4 items-center ">
              <div
                className={`px-3 py-2 rounded-[8px] flex flex-row gap-2 items-center justify-center ${
                  candidate.matchScore >= 75
                    ? "bg-accent/50"
                    : candidate.matchScore >= 50
                    ? "bg-yellow-500/50"
                    : "bg-red-500/50"
                }`}
              >
                <Sparkles className="text-card-foreground" />
                <p className="text-card-foreground">
                  {candidate.matchScore}%
                  <span className="text-xs text-muted-foreground ml-2">
                    match
                  </span>
                </p>
              </div>
              <DownloadCV
                cvUrl={candidate.cvUrl}
                candidateName={candidate.fullName}
              />
              <ViewCandidate candidateId={candidate.id} />
              <DeleteCandidate
                candidateId={candidate.id}
                candidateName={candidate.fullName}
              />
            </div>
          </div>

          <div className="flex gap-4 flex-col">
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-1">
                <Briefcase className="inline-block mr-1" />
                {candidate.yearsOfExperience} years
              </div>
              <div className="flex flex-row gap-1">
                <FileText className="inline-block mr-1" />
                Applied for {jobMap.get(candidate.jobId)}
              </div>
            </div>
            <div className="flex flex-row flex-wrap gap-2">
              {candidate.skills.map((skill) => (
                <Badge key={skill} className="mr-2 mb-2">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
