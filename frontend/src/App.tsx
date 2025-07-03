import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Companies from "./Pages/Companies";
import HowItWorks from "./Pages/HowItWorks";
import Community from "./Pages/Community";
import Careers from "./Pages/Careers";
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
          <Route path="/about" element={<About />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/community" element={<Community />} />
          <Route path="/careers" element={<Careers />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
