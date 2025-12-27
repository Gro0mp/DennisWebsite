import BackgroundRoom from "../components/HomeSection/BackgroundRoom.jsx";
import {Home} from "../components/HomeSection/Home.jsx";
import {About} from "../components/HomeSection/About.jsx";
import {WorkExperience} from "../components/HomeSection/WorkExperience.jsx";
import {Projects} from "../components/HomeSection/Projects.jsx";
import {Contacts} from "../components/HomeSection/Contacts.jsx";
import {Footer} from "../components/HomeSection/Footer.jsx";

export default function Portfolio() {
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full">
                <BackgroundRoom/>
            </div>
            <Home/>
            <About/>
            <WorkExperience />
            <Projects/>
            <Contacts/>
            <Footer/>
        </>
    );
}