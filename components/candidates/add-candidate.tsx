"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CandidateForm from "./candidate-form";

export default function AddCandidate() {
  const [open, setOpen] = useState(false);
  const handleSuccess = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus /> <p>Add Candidate</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-125">
        <DialogHeader>
          <DialogTitle>Add Candidate</DialogTitle>
        </DialogHeader>
        <CandidateForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
