"use client";

import { Button } from "../ui/button";
import { FileUp } from "lucide-react";

const handleExport = async () => {
  const response = await fetch("/api/candidates/export", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    console.error("Failed to export candidates");
    return;
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.download = "candidates.xlsx";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export default function ExportButton() {
  return (
    <Button onClick={handleExport}>
      <FileUp className="h-4 w-4" /> Export to Excel
    </Button>
  );
}
