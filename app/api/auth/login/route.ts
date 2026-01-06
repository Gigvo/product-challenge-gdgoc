import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();

    // validate incoming body is JSON
    let parsed: any;
    try {
      parsed = JSON.parse(rawBody);
    } catch (parseErr) {
      console.error("Invalid JSON forwarded to backend:", String(parseErr));
      return NextResponse.json(
        {
          error: "Invalid JSON in request body",
          sample: rawBody.slice(0, 1000),
        },
        { status: 400 }
      );
    }

    const res = await fetch(
      "https://ai-recruitment-backend-gdgoc.vercel.app/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      }
    );

    const data = await res.text();
    const setCookie = res.headers.get("set-cookie");
    const headers: Record<string, string> = {
      "Content-Type": res.headers.get("content-type") || "application/json",
      ...(setCookie ? { "Set-Cookie": setCookie } : {}),
    };

    return new NextResponse(data, { status: res.status, headers });
  } catch (err) {
    console.error("Proxy fetch error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
