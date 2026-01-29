"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import JobsForm from "./jobs-form";
import { Plus } from "lucide-react";

export default function AddJobs() {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    window.location.href = window.location.href;
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus className="inline" />
          Add Job Vacancy
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-125 max-md:max-w-80">
        <DialogHeader>
          <DialogTitle>Add Job Vacancy</DialogTitle>
        </DialogHeader>
        <JobsForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
