// File: app/api/repo/route.ts
import { NextResponse } from "next/server";

async function fetchRepoContents(
  owner: string,
  repo: string,
  path: string = ""
): Promise<any[]> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  );
  const data = await response.json();

  let allContents: any[] = [];
  for (const item of data) {
    if (item.type === "file") {
      allContents.push(item);
    } else if (item.type === "dir") {
      const subContents = await fetchRepoContents(owner, repo, item.path);
      allContents = allContents.concat(subContents);
    }
  }
  return allContents;
}

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
    const allFiles = await fetchRepoContents(owner, repo);
    return NextResponse.json(allFiles);
  } catch (error) {
    console.error("Error fetching repo:", error);
    return NextResponse.json({ error: "Error fetching repo" }, { status: 500 });
  }
}
