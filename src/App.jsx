import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';

import AllProjects from './pages/AllProjects';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';


import { initAnalytics, trackPageView } from './utils/analytics';

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
}

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <Router>
      <RouteTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/all-projects" element={<AllProjects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;