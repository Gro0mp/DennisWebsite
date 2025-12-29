import {RevealOnScroll} from "../RevealOnScroll.jsx";

export const Home = () => {
    return (
        <section id="home" className={`min-h-screen flex items-center justify-center relative`}>
            <RevealOnScroll>
                <div className={`text-center z-10 px-4 max-w-4xl mx-auto`}>
                    <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent leading-tight`}>
                        Hello, I am Dennis Wong
                    </h1>

                    <p className={`text-xl md:text-2xl md:font-bold text-white mb-8 max-w-2xl mx-auto`}>
                        Full Stack Developer & Software Engineer
                    </p>

                    <div className={`flex justify-center space-x-4`}>
                        <a href="#projects"
                           className={`bg-blue-600 text-white py-3 px-6 rounded font-semibold transition relative
                                overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.4)]`}>

                            View Projects
                        </a>
                        <a href="#contacts"
                           className={`bg-black-500 border-blue-500/50 text-blue-500 py-3 px-6 rounded font-semibold transition-all 
                                duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.2)] hover:bg-blue-500/10`}>

                            Contact Me
                        </a>
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
}