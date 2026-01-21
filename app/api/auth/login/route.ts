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
        { status: 400 },
      );
    }

    const res = await fetch(
      "https://ai-recruitment-backend-gdgoc.vercel.app/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      },
    );

    const data = await res.json();

    // Extract token from nested structure (data.data.token or data.token)
    const token =
      data.data?.token ||
      data.data?.accessToken ||
      data.data?.access_token ||
      data.token ||
      data.accessToken ||
      data.access_token;

    const response = NextResponse.json(data, { status: res.status });

    if (res.ok && token) {
      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
    }

    return response;
  } catch (err) {
    console.error("Proxy fetch error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
