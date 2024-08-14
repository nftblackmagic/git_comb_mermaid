// import React, { useEffect, useRef } from "react";
// import Script from "next/script";

// interface MermaidChartProps {
//   code: string;
// }

// declare global {
//   interface Window {
//     mermaid: any;
//   }
// }

// export default function MermaidChart({ code }: MermaidChartProps) {
//   const mermaidRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const renderChart = () => {
//       if (mermaidRef.current && window.mermaid) {
//         mermaidRef.current.innerHTML = code;
//         window.mermaid.run();
//       }
//     };

//     if (window.mermaid) {
//       renderChart();
//     }
//   }, [code]);

//   return (
//     <>
//       <Script
//         type="module"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: `
//          import mermaid from "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.esm.min.mjs";
//          mermaid.initialize({startOnLoad: true});
//          mermaid.contentLoaded();`,
//         }}
//       />
//       <div ref={mermaidRef} className="mermaid">
//         {code}
//       </div>
//     </>
//   );
// }
