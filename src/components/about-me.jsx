import TiltCard from "./TiltCard";

export default function AboutMe() {
    return (
        <section id="about" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-black py-16 sm:py-20 px-5 sm:px-8">
            <div className="max-w-6xl mx-auto w-full">

                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                        About <span className="text-[#80db66]">Me</span>
                    </h1>
                    <div className="w-24 h-1 bg-[#80db66] mx-auto rounded-full"></div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

                    <div className="space-y-3 sm:space-y-4">
                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                            I'm mugisha david, a passionate software developer dedicated to building meaningful technology solutions. <span className="font-bold">What can I build that actually matters?</span>
                        </p>

                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                            I've honed my skills through hands-on training and certifications from some of the world's most renowned technology companies and platforms — <span className="font-bold">IBM</span>, <span className="font-bold">Coursera</span>, <span className="font-bold">Google</span>, and <span className="font-bold">freeCodeCamp</span>. These experiences immersed me in real-world product development, from building user-centric web and mobile applications to working on enterprise systems, cloud platforms, and AI solutions.
                        </p>

                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                            My path is taking me from software development into AI and product engineering. I'm learning how to build complete systems, from the interface people use, to the backend that powers it, to the intelligence that makes a product genuinely useful.
                        </p>

                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                            I'm deliberately using these early years to develop the skills, discipline, and experience required to make that ambition real. I don't want to spend my career only building what someone else imagines. I want to become capable of imagining, building, and leading what comes next.
                        </p>
                    </div>


                    <div className="flex justify-center lg:justify-end">
                        <TiltCard maxTilt={14} className="group relative">
                            <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-gradient-to-br from-[#80db66] to-green-400 rounded-2xl shadow-[0_25px_60px_rgba(128,219,102,0.25)] relative transition-shadow duration-300">
                                <div className="tilt-inner absolute inset-4 bg-gray-900 rounded-xl flex items-center justify-center border border-white/10">
                                    <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent select-none">M</h2>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#80db66] rounded-full opacity-20 blur-sm"></div>
                            <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#80db66] rounded-full opacity-30 blur-sm"></div>
                        </TiltCard>
                    </div>
                </div>


                <div className="text-center mt-16">
                    <a href="#contact" className="inline-block px-8 py-3 bg-[#80db66] text-gray-900 font-semibold rounded-lg hover:bg-green-400 hover:-translate-y-0.5 transition-all duration-200 shadow-lg cursor-pointer">
                        Get In Touch
                    </a>
                </div>
            </div>
        </section>
    );
}
