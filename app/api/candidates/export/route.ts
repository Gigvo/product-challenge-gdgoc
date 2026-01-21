import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const res = await fetch(
    "https://ai-recruitment-backend-gdgoc.vercel.app/api/candidates/export",
    {
      method: "GET",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    },
  );

  if (!res.ok) {
    return new NextResponse("Failed to export candidates", {
      status: res.status,
    });
  }

  const fileBuffer = await res.arrayBuffer();
  const contentType =
    res.headers.get("content-type") ||
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const contentDisposition =
    res.headers.get("content-disposition") ||
    'attachment; filename="candidates.xlsx"';

  return new NextResponse(Buffer.from(fileBuffer), {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": contentDisposition,
    },
  });
}
