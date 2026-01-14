"use client";

import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface DownloadCVProps {
  cvUrl: string;
  candidateName: string;
}

export default function DownloadCV({ cvUrl, candidateName }: DownloadCVProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(cvUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      let urlFilename = decodeURIComponent(cvUrl.split("/").pop() || "cv.pdf");
      urlFilename = urlFilename.replace(/^\d+-/, "");
      link.download = urlFilename || `CV_${candidateName}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      window.open(cvUrl, "_blank");
    }
  };
  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      size="sm"
      title="Download CV"
    >
      <Download className="h-4 w-4" />
    </Button>
  );
}
