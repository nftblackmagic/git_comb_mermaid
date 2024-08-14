This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- Fetch and display files from a GitHub repository
- Select and combine multiple files from the repository
- Generate Mermaid diagrams based on the combined code content
- Copy combined content to clipboard
- Responsive design with Tailwind CSS

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the main application pages and API routes
  - `api/`: API routes for handling GitHub repo fetching, file combining, and LLM processing
  - `page.tsx`: Main application page
- `components/`: React components used in the application
  - `RepoViewer.tsx`: Main component for viewing repositories and generating diagrams
  - `FileList.tsx`: Component for displaying and selecting files
  - `CombinedContent.tsx`: Component for displaying combined file content
  - `MermaidChart.tsx`: Component for rendering Mermaid diagrams

## Environment Variables

Make sure to set the following environment variable:

- `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude AI integration

## Dependencies

- Next.js
- React
- Tailwind CSS
- Anthropic AI SDK
- Mermaid (loaded via CDN)
