"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
interface JobData {
  id: number;
  title: string;
  description: string;
  location: string;
  isActive: boolean;
  required_skills: string[];
}

interface EditJobFormProps {
  job: JobData;
  onSuccess: () => void;
}

export default function EditJobForm({ job, onSuccess }: EditJobFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: job.title,
    description: job.description,
    location: job.location,
    skills: job.required_skills.join(", "),
    isActive: job.isActive,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: Record<string, any> = {};

    if (formData.title !== job.title) {
      payload.title = formData.title;
    }
    if (formData.description !== job.description) {
      payload.description = formData.description;
    }
    if (formData.location !== job.location) {
      payload.location = formData.location;
    }
    if (formData.isActive !== job.isActive) {
      payload.isActive = formData.isActive;
    }

    const newSkills = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    if (JSON.stringify(newSkills) !== JSON.stringify(job.required_skills)) {
      payload.required_skills = newSkills;
    }

    if (Object.keys(payload).length === 0) {
      onSuccess();
      return;
    }

    try {
      const response = await fetch(`/api/job-vacancies/${job.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("Failed to update job vacancy");
        return;
      }

      onSuccess();
      router.refresh();
    } catch (error) {
      console.error("Error updating job vacancy:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Job Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="skills">Required Skills</Label>
        <Input
          id="skills"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="status">Job Status</Label>
          <p className="text-xs text-muted-foreground">
            {formData.isActive ? "Active" : "Inactive"}
          </p>
        </div>
        <Switch
          id="status"
          checked={formData.isActive}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isActive: checked })
          }
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Updating..." : "Update Job"}
      </Button>
    </form>
  );
}
