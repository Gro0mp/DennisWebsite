import './index.css';
import {LoadingScreen} from "./components/LoadingScreen.jsx";
import {Navbar} from "./components/Navbar.jsx";
import {MobileMenu} from "./components/MobileMenu.jsx";

// Home Page Components
import {Home} from "./components/home/Home.jsx";
import {About} from "./components/home/About.jsx";
import {Projects} from "./components/home/Projects.jsx";
import {Contacts} from "./components/home/Contacts.jsx";
import {WorkExperience} from "./components/home/WorkExperience.jsx";
import Portfolio from "./Home/pages/Portfolio.jsx";


// Chatbot Components
import Chatbot from "./InteractiveVirtualAssistant/pages/Chatbot.jsx";
import ChatBotBeta from "./InteractiveVirtualAssistant/pages/ChatBotBeta.jsx";
import VideoControls from "./components/interactivevirtualassistant/videoControls/VideoControls.jsx";
import {Scene} from "./components/interactivevirtualassistant/scene/Scene.jsx";

// Authentication Components
import Login from "./InteractiveVirtualAssistant/pages/Login.jsx";
import SignUp from "./InteractiveVirtualAssistant/pages/Signup.jsx";

import BackgroundRoom from "./components/home/BackgroundRoom.jsx";

import {BrowserRouter, HashRouter, Routes, Route, useLocation} from "react-router-dom";
import {useRef, useState} from "react";


// Layout component that conditionally shows navbar
function Layout({children}) {
    const location = useLocation();
    // Show navbar on portfolio page (root) and exclude specific Misc
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


