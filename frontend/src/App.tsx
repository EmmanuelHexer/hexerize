import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Blog from "./Pages/Blog";
import Projects from "./Pages/Projects";
import Services from "./Pages/Services";
import Navbar from "./Components/Navbar";
import Dropdown from "./Components/Dropdown";
import { useAppContext } from "./AppContext/AppContext";

function App() {
  const { showMenu } = useAppContext();

  return (
    <div
      className={`min-h-screen flex flex-col relative ${
        showMenu ? "overflow-hidden h-screen" : ""
      }`}
    >
      <Navbar />

      {/* Dropdown Overlay (Always on top of all pages) */}
      <Dropdown />

      {/* Main content behind dropdown */}
      <main
        className={`flex-1 pt-[60px] md:pt-[80px] w-full transition-all duration-300`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
