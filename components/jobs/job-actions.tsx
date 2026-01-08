"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import EditJobForm from "./edit-job-form";

interface JobData {
  id: number;
  title: string;
  description: string;
  location: string;
  isActive: boolean;
  required_skills: string[];
}

interface JobActionsProps {
  job: JobData;
}

export default function JobActions({ job }: JobActionsProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/job-vacancies/${job.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete job");
        return;
      }
      router.refresh();
    } catch (error) {
      console.error("Failed to delete job:", error);
    } finally {
      setLoading(false);
      setDeleteOpen(false);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-125">
          <DialogHeader>
            <DialogTitle>Edit Job Vacancy</DialogTitle>
          </DialogHeader>
          <EditJobForm job={job} onSuccess={() => setEditOpen(false)} />
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this job?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{job.title}&quot;. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
