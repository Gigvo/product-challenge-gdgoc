"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Upload, FileText, X } from "lucide-react";

interface CandidateFormProps {
  onSuccess: () => void;
}

interface Job {
  id: number;
  title: string;
  isActive: boolean;
}

export default function CandidateForm({ onSuccess }: CandidateFormProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/job-vacancies");
        if (response.ok) {
          const result = await response.json();
          if (result.data && Array.isArray(result.data)) {
            const activeJobs = result.data.filter((job: Job) => job.isActive);
            setJobs(activeJobs);
          }
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Please upload a valid PDF file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("File size should not exceed 5MB.");
        return;
      }
      setPdfFile(file);
      setError("");
    }
  };

  const handleRemoveFile = () => {
    setPdfFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedJob) {
      setError("Please select a job vacancy.");
      return;
    }

    if (!pdfFile) {
      setError("Please upload a CV in PDF format.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("jobId", selectedJob);
      formData.append("file", pdfFile);

      const response = await fetch("/api/candidates", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to submit candidate",
        );
      }

      onSuccess();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="position">Position</Label>
        <Select value={selectedJob} onValueChange={setSelectedJob}>
          <SelectTrigger>
            <SelectValue placeholder="Select a position"></SelectValue>
          </SelectTrigger>
          <SelectContent position="popper">
            {jobs.map((job) => (
              <SelectItem key={job.id} value={String(job.id)}>
                {job.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="cv">CV (PDF)</Label>
        <Input
          id="cv"
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        {!pdfFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            <Upload className="mx-auto mb-2 text-gray-400" />
            <p className="text-gray-600">Click to upload CV (PDF only)</p>
            <p className="text-xs text-gray-400 mt-1">PDF only, max 5MB</p>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 border-1 rounded-lg">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="text-sm truncate max-w-[200px]">
                {pdfFile.name}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <Button type="submit" disabled={loading} className="mt-4">
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
