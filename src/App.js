import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import { SidebarProvider } from "./context/SidebarContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import CoursePlayer from "./pages/CoursePlayer";

function App() {
  return (
    <GameProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />
            <Route path="/course/:courseId" element={<CoursePlayer />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </GameProvider>
  );
}

export default App;