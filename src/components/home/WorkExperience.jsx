import {RevealOnScroll} from "../RevealOnScroll.jsx";

export const WorkExperience = () => {
    return (
        <section id={`work`} className={`min-h-screen flex items-center justify-center py-20`}>
            <RevealOnScroll>
                <div className={`max-w-5xl mx-auto px-4`}>
                    <h2 className={`text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent text-center`}> Work Experience </h2>
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>

                        {/* Work Experience #1: Prospect Research Data Assistant */}
                        <div
                            className={`p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition bg-gray-500/20 bg-opacity-90 backdrop-filter backdrop-blur-xs`}>
                            <h3 className={`text-xl font-bold mb-2`}> Prospect Research Data Assistant </h3>
                            <p className={`text-white-400 mb-4`}>
                                <ul className="list-disc list-inside">
                                    <li>
                                        Conducted in-depth research on individuals, foundations, and corporations
                                        to identify potential donors and prospects
                                    </li>
                                    <li>
                                        Analyzed and interpreted data to prepare reports on donor giving patterns and interests
                                    </li>
                                    <li>
                                        Maintained accurate and up-to-date donor and prospect information in our advance database.
                                    </li>
                                </ul>
                            </p>
                            <div className={`flex flex-wrap gap-2 mb-4`}>
                            {["Data Analysis", "Data Management", "MySQL", "Excel"].map((skill, key) => (
                                    <span key={key} className={`bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20
                                                          hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.1)] transition-all`}>
                                  {skill}
                              </span>
                                ))}
                            </div>

                        </div>

                        {/* Work Experience #2 Biocompatibility & Toxicology Research Intern */}
                        <div
                            className={`p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition bg-gray-500/20 bg-opacity-90 backdrop-filter backdrop-blur-xs`}>
                            <h3 className={`text-xl font-bold mb-2`}> Biocompatibility & Toxicology Research Intern </h3>
                            <p className={`text-white-400 mb-4`}>
                                <ul className="list-disc list-inside">
                                    <li>
                                        Discussed with managers at Johnson & Johnson on how to refine the database
                                        to be increasingly efficient and improve user experience.
                                    </li>
                                    <li>
                                        Scanned experimental documentation containing information under which medical tools are tested in.
                                    </li>
                                    <li>
                                        Efficiently and properly recorded the data stored in the medical device documents.
                                        And ensure that it is understandable to future employees at Johnson & Johnson.
                                    </li>
                                </ul>
                            </p>
                            <div className={`flex flex-wrap gap-2 mb-4`}>
                                {["Data Analysis", "Data Management", "MySQL", "Excel"].map((skill, key) => (
                                    <span key={key} className={`bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20
                                                          hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.1)] transition-all`}>
                                  {skill}
                              </span>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
}