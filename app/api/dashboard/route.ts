import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    const res = await fetch(
      "https://ai-recruitment-backend-gdgoc.vercel.app/api/dashboard",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );

    const backend = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: backend.message || "Backend error", data: null },
        { status: res.status },
      );
    }

    return NextResponse.json({ data: backend.data }, { status: 200 });
  } catch (error) {
    console.error("Dashboard proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error", data: null },
      { status: 500 },
    );
  }
}
