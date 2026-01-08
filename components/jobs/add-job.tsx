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

export default function AddJobs() {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Job Vacancy</Button>
      </DialogTrigger>
      <DialogContent className="max-w-125">
        <DialogHeader>
          <DialogTitle>Add Job Vacancy</DialogTitle>
        </DialogHeader>
        <JobsForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
