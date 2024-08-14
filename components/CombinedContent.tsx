import { useState } from "react";

interface CombinedContentProps {
  content: string;
}

export default function CombinedContent({ content }: CombinedContentProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="h-screen flex flex-col">
      <h2 className="text-xl font-bold p-4">Combined Content</h2>
      <div className="flex-grow relative border rounded-lg overflow-hidden">
        <pre className="h-full p-4 overflow-y-auto">{content}</pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
