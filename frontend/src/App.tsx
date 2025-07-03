import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Companies from "./Pages/Companies";
import HowItWorks from "./Pages/HowItWorks";
import Community from "./Pages/Community";
import Careers from "./Pages/Careers";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-full">
        {/* Main content area */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/community" element={<Community />} />
          <Route path="/careers" element={<Careers />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </>
  );
}

export default App;
