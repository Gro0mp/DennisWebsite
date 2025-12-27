import './index.css';
import {LoadingScreen} from "./components/LoadingScreen.jsx";
import {Navbar} from "./components/Navbar.jsx";
import {MobileMenu} from "./components/MobileMenu.jsx";

// Home Page Components
import {Home} from "./components/HomeSection/Home.jsx";
import {About} from "./components/HomeSection/About.jsx";
import {Projects} from "./components/HomeSection/Projects.jsx";
import {Contacts} from "./components/HomeSection/Contacts.jsx";
import {WorkExperience} from "./components/HomeSection/WorkExperience.jsx";
import Portfolio from "./pages/Portfolio.jsx";

// Tutorial Components
import {Tutorial} from "./pages/Tutorial.jsx";


// Chatbot Components
import Chatbot from "./pages/Chatbot.jsx";
import ChatBotBeta from "./pages/ChatBotBeta.jsx";
import VideoControls from "./components/ChatbotSection/videoControls/VideoControls.jsx";
import {Scene} from "./components/ChatbotSection/scene/Scene.jsx";

// Authentication Components
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";

import BackgroundRoom from "./components/HomeSection/BackgroundRoom.jsx";

import {BrowserRouter, HashRouter, Routes, Route, useLocation} from "react-router-dom";
import {useRef, useState} from "react";


// Layout component that conditionally shows navbar
function Layout({children}) {
    const location = useLocation();
    // Show navbar on portfolio page (root) and exclude specific pages
    const showNavbar = location.pathname === '/' || location.pathname === '/denniswong-portfolio';
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {showNavbar && <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>}
            {showNavbar && <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>}
            {children}
        </>
    );
}

function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)}/>}
            <div
                className={`font-display min-h-screen transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"} bg-black text-gray-100`}>

                <BrowserRouter>
                    <Layout>
                        <Routes>
                            {/* Root route serves the portfolio */}
                            <Route path="/" element={<Portfolio />} />
                            <Route path="/denniswong-portfolio" element={<Portfolio />} />

                            <Route path="/chatbot" element={<Chatbot />} />

                            {/* WebGPU Test Route */}
                            <Route path="/tutorial" element={<Tutorial />} />

                            {/* Login Route */}
                            <Route path="/login" element={<Login/>}/>
                            {/* Signup Route */}
                            <Route path="/signup" element={<SignUp/>}/>

                            {/* Testing Routes */}
                            <Route path={"/video-test"} element={<VideoControls/>}/>
                            <Route path={"/scene-test"} element={<Scene/>}/>
                            <Route path={"/chatbot-test"} element={<ChatBotBeta/>}/>

                        </Routes>
                    </Layout>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App


