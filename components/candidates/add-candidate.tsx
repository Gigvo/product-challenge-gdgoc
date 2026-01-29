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
import { Gemini } from "@lobehub/icons";

export default function AddCandidate() {
  const [open, setOpen] = useState(false);
  const [summarizeOpen, setSummarizeOpen] = useState(false);

  const handleStart = () => {
    setOpen(false);
    setSummarizeOpen(true);
  };

  const handleSuccess = () => {
    setSummarizeOpen(false);
    window.location.reload();
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">
            <Plus /> <p>Add Candidate</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-125 max-md:max-w-80">
          <DialogHeader>
            <DialogTitle>Add Candidate</DialogTitle>
          </DialogHeader>
          <CandidateForm
            onSuccess={handleSuccess}
            onSubmitStart={handleStart}
          />
        </DialogContent>
      </Dialog>

      {/* Summarizing dialog */}
      <Dialog open={summarizeOpen} onOpenChange={setSummarizeOpen}>
        <DialogContent className="max-w-125 max-md:max-w-80">
          <DialogHeader>
            <DialogTitle className="sr-only">
              Summarizing candidate data
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center p-6">
            <svg
              className="animate-spin h-12 w-12 text-blue-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <div className="flex flex-col justify-center"></div>
            <p className="text-center text-2xl font-bold">
              Summarizing with AI
            </p>
            <span className="flex flex-row gap-1 items-center text-xs">
              powered by
              <Gemini.Color size={14} />
              <Gemini.Text size={14} />
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
