"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

interface JobsFormProps {
  onSuccess: () => void;
}

export default function JobsForm({ onSuccess }: JobsFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      required_skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),
    };

    try {
      const response = await fetch("/api/job-vacancies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("Failed to submit job vacancy");
      }
    } catch (error) {
      console.error("Error submitting job vacancy:", error);
    } finally {
      setLoading(false);
    }

    onSuccess?.();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g Frontend Developer"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Job description here"
          rows={4}
          required
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
          placeholder="e.g Jakarta, Indonesia"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="skills">Required Skills</Label>
        <Input
          id="skills"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          placeholder="e.g HTML, CSS, JavaScript"
          required
        />
        <p className="text-xs text-muted-foreground">
          Separate skills with commas
        </p>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating..." : "Create Job Vacancy"}
      </Button>
    </form>
  );
}
