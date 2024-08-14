import RepoViewer from "@/components/RepoViewer";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">GitHub Repo Viewer</h1>
      <RepoViewer />
    </main>
  );
}
