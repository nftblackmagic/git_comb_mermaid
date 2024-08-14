// File: components/RepoViewer.tsx
"use client";

import { useState } from "react";
import FileList from "./FileList";
import CombinedContent from "./CombinedContent";
import MermaidChart from "./MermaidChart"; // Add this import

export default function RepoViewer() {
  const [repoUrl, setRepoUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [combinedContent, setCombinedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mermaidCode, setMermaidCode] = useState(""); // Add this state

  const fetchRepo = async () => {
    try {
      const response = await fetch(
        `/api/repo?url=${encodeURIComponent(repoUrl)}`
      );
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching repo:", error);
      alert("Error fetching repo. Please check the URL and try again.");
    }
  };

  const combineSelectedFiles = async (selectedFiles: string[]) => {
    try {
      const response = await fetch("/api/combine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl, files: selectedFiles }),
      });
      const data = await response.json();
      setCombinedContent(data.content);
    } catch (error) {
      console.error("Error combining files:", error);
      alert("Error combining files. Please try again.");
    }
  };

  const sendToLLM = async () => {
    if (!combinedContent) {
      alert("Please combine files before sending to LLM.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: combinedContent }),
      });
      const data = await response.json();
      console.log("LLM response:", data);
      setMermaidCode(data.result); // Assuming the LLM returns mermaid code
    } catch (error) {
      console.error("Error sending to LLM:", error);
      alert("Error sending files to LLM. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="Enter GitHub repo URL"
        className="border p-2 mr-2"
      />
      <button
        onClick={fetchRepo}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Fetch Repo
      </button>
      <FileList files={files} onCombine={combineSelectedFiles} />
      <CombinedContent content={combinedContent} />
      <button
        onClick={sendToLLM}
        disabled={!combinedContent || isLoading}
        className="bg-green-500 text-white p-2 rounded mt-4 disabled:bg-gray-400"
      >
        {isLoading ? "Sending..." : "Send to LLM"}
      </button>
      {mermaidCode && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Mermaid Code</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code>{mermaidCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
