import { NextResponse } from "next/server";

const BACKEND = "https://ai-recruitment-backend-gdgoc.vercel.app/api/users";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const auth = req.headers.get("authorization") || "";
    const cookie = req.headers.get("cookie") || "";

    const res = await fetch(BACKEND, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookie ? { cookie } : {}),
        ...(auth ? { authorization: auth } : {}),
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/json",
      },
    });
  } catch (err) {
    console.error("Proxy error /api/users:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
