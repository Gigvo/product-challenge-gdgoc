import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { id } = await params;

    const res = await fetch(
      `https://ai-recruitment-backend-gdgoc.vercel.app/api/job-vacancies/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const res = await fetch(
      `https://ai-recruitment-backend-gdgoc.vercel.app/api/job-vacancies/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
