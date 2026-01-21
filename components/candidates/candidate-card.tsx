"use client";

import React, { useEffect, useState } from "react";
import ViewCandidate from "./view-candidate";
import DeleteCandidate from "./delete-candidate";
import DownloadCV from "./download-cv";
import { Badge } from "../ui/badge";
import {
  Briefcase,
  FileText,
  Sparkles,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  createdAt: string;
}

interface JobData {
  id: number;
  title: string;
}

export default function CandidateCard() {
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("matchScore");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candidatesRes, jobsRes] = await Promise.all([
          fetch("/api/candidates", { cache: "no-store" }),
          fetch("/api/job-vacancies", { cache: "no-store" }),
        ]);
        if (!candidatesRes.ok || !jobsRes.ok) {
          throw new Error("Failed to fetch data");
        }
        const candidatesData = await candidatesRes.json();
        const jobsData = await jobsRes.json();
        setCandidates(
          Array.isArray(candidatesData.data) ? candidatesData.data : [],
        );
        setJobs(Array.isArray(jobsData.data) ? jobsData.data : []);
      } catch (err) {
        setError("Failed to fetch candidates or jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteSuccess = (deletedId: number) => {
    setCandidates((prev) =>
      prev.filter((candidate) => candidate.id !== deletedId),
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  const jobMap = new Map(jobs.map((job) => [job.id, job.title]));

  const filteredCandidates = candidates
    .filter(
      (candidate) =>
        candidate.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        jobMap
          .get(candidate.jobId)
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "matchScore") return b.matchScore - a.matchScore;
      if (sortBy === "name") return a.fullName.localeCompare(b.fullName);
      if (sortBy === "date")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      return 0;
    });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-row gap-2 items-center relative flex-1">
          <Search className="left-3 absolute w-4 h-4" />
          <Input
            placeholder="Search Candidates"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          ></Input>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <ArrowUpDown />
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="matchScore">Match Score</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredCandidates.map((candidate: CandidateData) => (
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
                onDeleteSuccess={handleDeleteSuccess}
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
