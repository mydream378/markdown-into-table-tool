import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/Home";
import ProjectsPage from "./pages/Projects";
import PublicationsPage from "./pages/Publications";
import TutorialsPage from "./pages/Tutorials";
import MarkdownTableTool from "./pages/MarkdownTableTool";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/table-tool" element={<MarkdownTableTool />} />
        </Routes>
      </div>
    </Router>
  );
}
