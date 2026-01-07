import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/Home";
import ProjectsPage from "./pages/Projects";
import PublicationsPage from "./pages/Publications";
import TutorialsPage from "./pages/Tutorials";
import MarkdownTableTool from "./pages/MarkdownTableTool";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <Router basename={import.meta.env.BASE_URL}>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/table-tool" element={<MarkdownTableTool />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}
