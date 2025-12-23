import {RevealOnScroll} from "../RevealOnScroll.jsx";

export const About = () => {

    const frontendSkills = ["React", "ReactDOM", "Vite", "TailwindCSS", "Javascript", "Typescript"];
    const backendSkills = ["NodeJS", "Azure", "Google Cloud Platform", "PostgresSQL", "MongoDB", "Spring Boot"]

    return (
        <section id="about" className="min-h-screen flex items-center justify-center py-20">
            <RevealOnScroll>
                <div className={`max-w-3xl mx-auto px-4`}>
                    <h2 className={`text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent text-center`}>
                        About Me
                    </h2>

                    <div className={`rounded-xl p-8 border-white/10 bg-gray-500/20 bg-opacity-90 backdrop-filter backdrop-blur-xs border hover:-translate-y-1 transition-all`}>
                        <p className={`text-gray-300 mb-6`}>
                            I'm Dennis Wong, a Computer Science graduate from UMass Boston, specializing in
                            software development and
                            data analysis. I bring hands-on experience from roles like Prospect Research Data Assistant,
                            where I supported scholarships by
                            managing large data sets for organizations like Vertex and State Street. I also interned at
                            Johnson & Johnson, where I streamlined
                            data for a medical tool database using Excel macros. A notable project I developed is a
                            local
                            Weather Station, a smart, connected weather station powered by an ESP32 board and various
                            sensors.
                            It collects real-time environmental data, sends it to a dashboard, and uses AI to predict
                            future
                            weather trends based on historical data.
                            With skills in Java, C, C++, JavaScript, and MySQL, I’m eager to apply my technical
                            expertise to
                            a software development or data analysis role.
                        </p>

                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                            <div className={`rounded-xl p-6 hover:-translate-y-1 transition-all`}>
                                <h3 className={`text-xl font-bold mb-4`}>
                                    Frontend
                                </h3>
                                <div className={`flex flex-wrap gap-2`}>
                                    {/* Loop through elements in frontendSkills list and display */}
                                    {frontendSkills.map((skill, key) => (
                                        <span key={key} className={`bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20
                                                          hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition`}>
                                            {skill}
                                    </span>
                                    ))}
                                </div>
                            </div>

                            <div className={`rounded-xl p-6 hover:-translate-y-1 transition-all`}>
                                <h3 className={`text-xl font-bold mb-4`}>
                                    Backend
                                </h3>
                                <div className={`flex flex-wrap gap-2`}>
                                    {/* Loop through elements in backendSkills list and display */}
                                    {backendSkills.map((skill, key) => (
                                        <span key={key} className={`bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20
                                                          hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition`}>
                                            {skill}
                                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* The grid to hold the education and work experience */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mt-8`}>
                        {/* The Education Box component */}
                        <div className={`p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all bg-gray-500/20 bg-opacity-90 backdrop-filter backdrop-blur-xs`}>
                            <h3 className={`text-xl font-bold mb-4`}>
                                Education
                            </h3>
                            <ul className={`list-disc list-inside text-gray-300 space-y-2`}>
                                <li>
                                    <strong> B.S. in Computer Science - </strong> University of Massachusetts Boston
                                    (2022-2025)
                                </li>
                                <li>
                                    <strong> Relevant Coursework - </strong>
                                    Data Structures & Algorithms | Internetworking | An Introduction to Software
                                    Engineering
                                    |
                                    Operating Systems | Computer Architecture & Organization
                                </li>
                                <li>
                                    <strong> Organizations & Awards - </strong>
                                    MathWorks Scholars, Dean's Academic Recognition List in the Honors College,
                                    Chancellor's Scholarship
                                </li>
                            </ul>
                        </div>

                        {/* The Professional Experience Box component */}
                        <div className={`p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all bg-gray-500/20 bg-opacity-90 backdrop-filter backdrop-blur-xs`}>
                            <h3 className={`text-xl font-bold mb-4`}>
                                Professional Experience
                            </h3>
                            <div className={`space-y-4 text-gray-300`}>
                                <div>
                                    <h4><strong> Prospect Research Data Assistant at UMass Boston (Feb 2023 -
                                        Present) </strong></h4>
                                    <p> Conducted data analysis on individuals and corporations to identify donors and
                                        prospects. </p>
                                </div>
                                <div>
                                    <h4><strong> Biocompatibility & Toxicology Researcher (Feb 2021 - May
                                        2021) </strong></h4>
                                    <p> Developed and refined a database to record safety on medical devices. </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </RevealOnScroll>
        </section>
    );
}