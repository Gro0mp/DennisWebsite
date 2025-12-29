import BackgroundRoom from "../../components/home/BackgroundRoom.jsx";
import {Home} from "../../components/home/Home.jsx";
import {About} from "../../components/home/About.jsx";
import {WorkExperience} from "../../components/home/WorkExperience.jsx";
import {Projects} from "../../components/home/Projects.jsx";
import {Contacts} from "../../components/home/Contacts.jsx";
import {Footer} from "../../components/home/Footer.jsx";

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