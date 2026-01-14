import { NextResponse } from "next/server";

const BACKEND =
  "https://ai-recruitment-backend-gdgoc.vercel.app/api/candidates";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const res = await fetch(`${BACKEND}/${id}`, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const res = await fetch(`${BACKEND}/${id}`, { method: "DELETE" });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to delete candidate" },
        { status: res.status }
      );
    }

    // Handle empty response (204 No Content or empty body)
    const text = await res.text();
    const data = text ? JSON.parse(text) : { success: true };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
