// File: app/api/combine/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { repoUrl, files } = await request.json();

  if (!repoUrl || !files || files.length === 0) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const [owner, repo] = repoUrl.split("/").slice(-2);
  let combinedContent = "";

  for (const file of files) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${file}`
      );
      const data = await response.json();
      const content = Buffer.from(data.content, "base64").toString("utf-8");
      combinedContent += `// File: ${file}\n\n${content}\n\n`;
    } catch (error) {
      console.error(`Error fetching file ${file}:`, error);
      combinedContent += `// Error fetching file: ${file}\n\n`;
    }
  }

  return NextResponse.json({ content: combinedContent });
}
