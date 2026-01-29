"use client";

import { useEffect, useState, useCallback } from "react";
import JobActions from "./job-actions";
import { Search, MapPin, ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
interface JobData {
  id: number;
  title: string;
  description: string;
  location: string;
  isActive: boolean;
  required_skills: string[];
}

export default function JobCard() {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [jobStatus, setJobStatus] = useState("all");

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/job-vacancies", {
        cache: "no-store",
      });
      if (response.ok) {
        const result = await response.json();
        setJobs(Array.isArray(result.data) ? result.data : []);
      } else {
        setError("Failed to fetch jobs");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleRefresh = () => {
    fetchJobs();
  };

  const handleDeleteSuccess = () => {
    fetchJobs();
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      jobStatus === "all" || job.isActive === (jobStatus === "active");

    return matchesSearch && matchesFilter;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <div className="flex flex-row gap-2 items-center relative flex-1">
          <Search className="left-3 absolute w-4 h-4" />
          <Input
            placeholder="Search Jobs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          ></Input>
        </div>
        <Select value={jobStatus} onValueChange={setJobStatus}>
          <SelectTrigger>
            <ListFilter />
            <SelectValue placeholder="Filter By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid lg:grid-cols-2 grid-rows-1 py-8 gap-4">
        {filteredJobs.map((job: JobData) => (
          <div key={job.id} className="border p-4 rounded-xl shadow bg-card">
            <div className="flex flex-row justify-between gap-4">
              <div className="flex flex-row gap-4 items-center">
                <h4 className="text-xl font-bold">{job.title}</h4>
                <Badge className={job.isActive ? "bg-green-500" : "bg-red-500"}>
                  {job.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <JobActions
                job={job}
                onDeleteSuccess={handleDeleteSuccess}
                onEditSuccess={handleRefresh}
              />
            </div>
            <p className="text-muted-foreground">{job.description}</p>
            <p className="text-se flex items-center gap-2 mt-2">
              <MapPin className="w-3 h-3" />
              {job.location}
            </p>

            <p className="text-sm text-muted-foreground mt-2 font-semibold">
              Requirements:
            </p>
            <ul className="list-disc list-inside ">
              {job.required_skills && job.required_skills.length > 0 ? (
                job.required_skills.map((req, reqIndex) => (
                  <li key={reqIndex} className="text-sm text-muted-foreground">
                    {req}
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-600">
                  No specific requirements
                </p>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
