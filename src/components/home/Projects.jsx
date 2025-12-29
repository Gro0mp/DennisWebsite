import {RevealOnScroll} from "../RevealOnScroll.jsx";

export const Projects = () => {
    return (
        <section id={`projects`} className={`min-h-screen flex items-center justify-center py-20`}>
            <RevealOnScroll>
                <div className={`max-w-5xl mx-auto px-4`}>
                    <h2 className={`text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent text-center`}> Featured
                        Projects </h2>
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>

                        {/* Project #1 Weather Station */}
                        <div
                            className={`p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition bg-gray-500/20 bg-opacity-90 backdrop-filter backdrop-blur-xs`}>
                            <h3 className={`text-xl font-bold mb-2`}> Weather Station </h3>
                            <p className={`text-white-400 mb-4`}>
                                A smart, connected weather station powered by an ESP32 board and various sensors.
                                It collects real-time environmental data, sends it to a dashboard, and uses AI to
                                predict
                                future weather trends based on historical data.
                            </p>
                            <div className={`flex flex-wrap gap-2 mb-4`}>
                                {["C++", "Python", "Microsoft Azure", "Machine Learning"].map((skill, key) => (
                                    <span key={key} className={`bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20
                                                          hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.1)] transition-all`}>
                                  {skill}
                              </span>
                                ))}
                            </div>

                            <div className={`flex justify-between items-center`}>
                                <a href={`https://github.com/Gro0mp/Weather-Station`}
                                   className={`text-blue-400 hover:text-blue-300 transition-colors my-4`}>
                                    View Repository
                                </a>
                            </div>

                        </div>

                        {/* Project #2 Game Search Engine */}
                        <div
                            className={`p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition bg-gray-500/20 bg-opacity-90 backdrop-filter backdrop-blur-xs`}>
                            <h3 className={`text-xl font-bold mb-2`}> Game Search Engine </h3>
                            <p className={`text-white-400 mb-4`}>
                                A Java-based recommendation engine that helps users discover new games based on their
                                Steam
                                library and preferences. The engine uses fuzzy search algorithms and tag-based analysis
                                to
                                provide personalized game recommendations.
                            </p>
                            <div className={`flex flex-wrap gap-2 mb-4`}>
                                {["Java", "Data Analysis", "JavaFX", "Docker"].map((skill, key) => (
                                    <span key={key} className={`bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20
                                                          hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.1)] transition-all`}>
                                  {skill}
                              </span>
                                ))}
                            </div>

                            <div className={`flex justify-between items-center`}>
                                <a href={`https://github.com/Gro0mp/GameSearchEngine`}
                                   className={`text-blue-400 hover:text-blue-300 transition-colors my-4`}>
                                    View Repository
                                </a>
                            </div>

                        </div>

                        {/* Project #3 Hearts of Iron 4 */}
                        <div
                            className={`p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition bg-gray-500/20 bg-opacity-90 backdrop-filter backdrop-blur-xs`}>
                            <h3 className={`text-xl font-bold mb-2`}> Hearts of Iron IV Utilities </h3>
                            <p className={`text-white-400 mb-4`}>
                                A Java-based recommendation engine that helps users discover new games based on their
                                Steam
                                library and preferences. The engine uses fuzzy search algorithms and tag-based analysis
                                to
                                provide personalized game recommendations.
                            </p>
                            <div className={`flex flex-wrap gap-2 mb-4`}>
                                {["Java", "Data Analysis", "JavaFX", "Docker"].map((skill, key) => (
                                    <span key={key} className={`bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20
                                                          hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.1)] transition-all`}>
                                  {skill}
                              </span>
                                ))}
                            </div>

                            <div className={`flex justify-between items-center`}>
                                <a href={`https://github.com/Gro0mp/HOIIVUtils`}
                                   className={`text-blue-400 hover:text-blue-300 transition-colors my-4`}>
                                    View Repository
                                </a>
                            </div>
                        </div>

                        {/* Project #4 Virtual Assistant */}
                        <div
                            className={`p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition bg-gray-500/20 bg-opacity-90 backdrop-filter backdrop-blur-xs`}>
                            <h3 className={`text-xl font-bold mb-2`}> Interactive Virtual Assistant </h3>
                            <p className={`text-white-400 mb-4`}>
                                A Java-based recommendation engine that helps users discover new games based on their
                                Steam
                                library and preferences. The engine uses fuzzy search algorithms and tag-based analysis
                                to
                                provide personalized game recommendations.
                            </p>
                            <div className={`flex flex-wrap gap-2 mb-4`}>
                                {["Java", "Spring Boot", "React", "Vite", "Javascript", "Docker"].map((skill, key) => (
                                    <span key={key} className={`bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20
                                                          hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.1)] transition-all`}>
                                  {skill}
                              </span>
                                ))}
                            </div>

                            <div className={`flex justify-between items-center`}>
                                <a href={`https://github.com/Gro0mp/DennisWebsite/tree/main/src/InteractiveVirtualAssistant`}
                                   className={`text-blue-400 hover:text-blue-300 transition-colors my-4`}>
                                    View Repository
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
}