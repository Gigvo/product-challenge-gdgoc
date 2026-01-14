import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const jobId = formData.get("jobId");
    const file = formData.get("file") as File;

    if (!jobId || !file) {
      return NextResponse.json(
        { error: "jobId and file are required" },
        { status: 400 }
      );
    }

    // Convert File to ArrayBuffer then to Blob
    const bytes = await file.arrayBuffer();
    const blob = new Blob([bytes], { type: "application/pdf" });

    const backendFormData = new FormData();
    backendFormData.append("jobId", jobId as string);
    backendFormData.append("file", blob, file.name);

    const response = await fetch(
      "https://ai-recruitment-backend-gdgoc.vercel.app/api/candidates",
      {
        method: "POST",
        body: backendFormData,
      }
    );

    const responseText = await response.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        { error: "Invalid response from backend: " + responseText },
        { status: 500 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || data.error || "Backend error" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating candidate:", error);
    return NextResponse.json(
      { error: "Failed to create candidate: " + String(error) },
      { status: 500 }
    );
  }
}
