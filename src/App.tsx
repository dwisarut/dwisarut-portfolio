import LandingPage from "./components/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Work from "./components/Work";
import Project from "./components/Project";
import ProjectDetail from "./components/ProjectDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="overflow-x-hidden">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/work" element={<Work />} />
            <Route path="/project" element={<Project />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
