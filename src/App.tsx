//import { useState } from "react";
import LandingPage from "./components/Landing";
import AboutMe from "./components/AboutMe";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Work from "./components/Work";
import Blog from "./components/Blog";
import Project from "./components/Project";
import ProjectDetail from "./components/ProjectDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="overflow-x-hidden">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/aboutme" element={<AboutMe />} />
            <Route path="/work" element={<Work />} />
            <Route path="/project" element={<Project />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
