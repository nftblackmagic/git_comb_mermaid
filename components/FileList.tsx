// File: components/FileList.tsx
"use client";

import { useState } from "react";

interface File {
  sha: string;
  path: string;
}

interface FileListProps {
  files: File[];
  onCombine: (selectedFiles: string[]) => void;
}

export default function FileList({ files, onCombine }: FileListProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleCheckboxChange = (file: File) => {
    setSelectedFiles((prev) =>
      prev.includes(file.path)
        ? prev.filter((f) => f !== file.path)
        : [...prev, file.path]
    );
  };

  return (
    <div className="my-4">
      <ul>
        {files.map((file) => (
          <li key={file.sha} className="mb-2">
            <input
              type="checkbox"
              id={file.sha}
              checked={selectedFiles.includes(file.path)}
              onChange={() => handleCheckboxChange(file)}
              className="mr-2"
            />
            <label htmlFor={file.sha}>{file.path}</label>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onCombine(selectedFiles)}
        className="bg-green-500 text-white p-2 rounded mt-4"
      >
        Combine Selected Files
      </button>
    </div>
  );
}
