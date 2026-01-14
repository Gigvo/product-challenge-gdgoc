"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";

interface ViewCandidateProps {
  candidateId: number;
}

export default function ViewCandidate({ candidateId }: ViewCandidateProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      onClick={() => router.push(`/candidates/${candidateId}`)}
      disabled={isLoading}
      variant="outline"
    >
      <Eye className="mr-2 h-4 w-4" />
      <p>View</p>
    </Button>
  );
}
