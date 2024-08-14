// File: app/api/repo/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repoUrl = searchParams.get("url");

  console.log("Debug: Received repo URL:", repoUrl);

  if (!repoUrl) {
    return NextResponse.json(
      { error: "No repo URL provided" },
      { status: 400 }
    );
  }

  const [owner, repo] = repoUrl.split("/").slice(-2);

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents`
    );
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching repo:", error);
    return NextResponse.json({ error: "Error fetching repo" }, { status: 500 });
  }
}
