import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const token = req.cookies.get("token")?.value;

    const res = await fetch(
      "https://ai-recruitment-backend-gdgoc.vercel.app/api/candidates",
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );
    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json(result, { status: res.status });
    }

    const candidates = result.data || result;
    const candidate = candidates.find(
      (c: { id: number }) => c.id === parseInt(id, 10),
    );

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(candidate, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const token = req.cookies.get("token")?.value;
    const res = await fetch(
      `https://ai-recruitment-backend-gdgoc.vercel.app/api/candidates/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to delete candidate" },
        { status: res.status },
      );
    }

    const text = await res.text();
    const data = text ? JSON.parse(text) : { success: true };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
