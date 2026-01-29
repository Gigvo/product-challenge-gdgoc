"use client";

import React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface DeleteCandidateProps {
  candidateId: number;
  candidateName: string;
  onDeleteSuccess?: (id: number) => void;
}

export default function DeleteCandidate({
  candidateId,
  candidateName,
  onDeleteSuccess,
}: DeleteCandidateProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/candidates/${candidateId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDeleteOpen(false);
        onDeleteSuccess?.(candidateId);
      }
    } catch (error) {
      console.error("Failed to delete candidate:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button
        onClick={() => setDeleteOpen(true)}
        disabled={isLoading}
        variant="destructive"
        size="sm"
        title={`Delete ${candidateName}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Candidate?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{candidateName}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
