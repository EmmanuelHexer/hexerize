import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Dropdown from "./Components/Dropdown";
import LoadingSpinner from "./Components/LoadingSpinner";
import ErrorBoundary from "./Components/ErrorBoundary";
import { useAppContext } from "./AppContext/AppContext.tsx";

// Eager load critical pages for instant access
import Home from "./Pages/Home";
import Services from "./Pages/Services"; // Critical business page

// Lazy load secondary pages for performance
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));
const Blog = lazy(() => import("./Pages/Blog"));
const BlogPost = lazy(() => import("./Pages/BlogPost"));
const Projects = lazy(() => import("./Pages/Projects"));
const NotFound = lazy(() => import("./Pages/NotFound"));

function App() {
  const { showMenu } = useAppContext();

  // Intelligent preloading of lazy components on idle (delayed on mobile)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const preloadComponents = () => {
      // Preload most likely next pages after initial render
      setTimeout(() => {
        import("./Pages/About"); // About is commonly visited after landing
        import("./Pages/Contact"); // Contact is high-conversion page
      }, isMobile ? 3000 : 2000); // Longer delay on mobile

      // Preload remaining components on user interaction
      setTimeout(() => {
        import("./Pages/Projects");
        import("./Pages/Blog");
      }, isMobile ? 8000 : 5000);
    };

    // Start preloading when browser is idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadComponents);
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(preloadComponents, isMobile ? 5000 : 3000);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div
        className={`min-h-screen flex flex-col relative bg-[color:var(--body-background)] ${
          showMenu ? "overflow-hidden h-screen" : ""
        }`}
      >
        <Navbar />

        {/* Dropdown Overlay (Always on top of all pages) */}
        <Dropdown />

        {/* Main content behind dropdown */}
        <main
          className={`flex-1 pt-[60px] md:pt-[80px] w-full transition-all duration-300 bg-[color:var(--body-background)]`}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
