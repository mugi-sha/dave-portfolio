import { FaGithub, FaLinkedin, FaX, FaWhatsapp } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"

export default function Contacts() {
    return (
        <section id="contact" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-black py-16 sm:py-20 px-5 sm:px-8">
            <div className="max-w-6xl w-full">

                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-10 sm:mb-12">
                    Get In Touch
                </h1>


                <div className="
                    w-full 
                    flex 
                    flex-col 
                    lg:flex-row 
                    gap-6
                    text-white
                ">


                    {/* FORM */}
                    <div className="
                        w-full 
                        lg:w-[60%]
                    ">

                        <form className="
                            bg-gray-800 
                            p-5 
                            md:p-6
                            rounded-xl
                        ">

                            <h3 className="font-semibold mt-3">
                                Name
                            </h3>

                            <input
                                type="text"
                                placeholder="Your name"
                                className="
                                bg-gray-900 
                                w-full 
                                px-3 
                                py-3 
                                text-white/70 
                                mt-2 
                                rounded-lg
                                outline-none
                                focus:ring-2
                                focus:ring-[#80db66]
                                "
                            />


                            <h3 className="font-semibold mt-4">
                                Email
                            </h3>

                            <input
                                type="email"
                                placeholder="youremail@example.com"
                                className="
                                bg-gray-900 
                                w-full 
                                px-3 
                                py-3 
                                text-white/70 
                                mt-2 
                                rounded-lg
                                outline-none
                                focus:ring-2
                                focus:ring-[#80db66]
                                "
                            />


                            <h3 className="font-semibold mt-4">
                                Subject
                            </h3>

                            <input
                                type="text"
                                placeholder="How can I help?"
                                className="
                                bg-gray-900 
                                w-full 
                                px-3 
                                py-3 
                                text-white/70 
                                mt-2 
                                rounded-lg
                                outline-none
                                focus:ring-2
                                focus:ring-[#80db66]
                                "
                            />


                            <h3 className="font-semibold mt-4">
                                Message
                            </h3>

                            <textarea
                                placeholder="Tell me about your project"
                                className="
                                bg-gray-900 
                                w-full 
                                h-32
                                px-3 
                                py-3 
                                text-white/70 
                                mt-2 
                                rounded-lg
                                resize-none
                                outline-none
                                focus:ring-2
                                focus:ring-[#80db66]
                                "
                            />


                            <button
                                className="
                                w-full
                                py-3
                                rounded-lg
                                bg-[#80db66]
                                mt-6
                                text-black
                                font-semibold
                                hover:scale-[1.02]
                                transition
                                cursor-pointer
                                "
                            >
                                Send Message
                            </button>


                        </form>

                    </div>



                    {/* RIGHT SIDE */}
                    <div className="
                        w-full 
                        lg:w-[40%]
                        flex
                        flex-col
                        gap-6
                    ">


                        {/* CONNECT */}
                        <div className="
                            bg-gray-800
                            p-5
                            rounded-xl
                        ">

                            <h2 className="text-xl font-semibold">
                                Let's Connect
                            </h2>


                            <p className="
                                text-white/80
                                mt-3
                                leading-relaxed
                            ">
                                I'm always open to discussing new projects,
                                creative ideas, or opportunities to be part
                                of your vision.
                            </p>



                            <div className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                gap-3
                                mt-5
                            ">

                                <a 
                                    href="https://github.com/mugi-sha" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-gray-900 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
                                >
                                    <FaGithub />
                                    Github
                                </a>


                                <button className="
                                    flex
                                    items-center
                                    gap-2
                                    bg-gray-900
                                    px-4
                                    py-3
                                    rounded-lg
                                ">
                                    <FaLinkedin />
                                    LinkedIn
                                </button>


                                <button className="
                                    flex
                                    items-center
                                    gap-2
                                    bg-gray-900
                                    px-4
                                    py-3
                                    rounded-lg
                                ">
                                    <FaX />
                                    X
                                </button>


                                <a 
                                    href="mailto:mugishadavid910@gmail.com"
                                    className="flex items-center gap-2 bg-gray-900 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
                                >
                                    <MdEmail />
                                    Email
                                </a>


                                <a 
                                    href="https://wa.me/250796888684"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-gray-900 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
                                >
                                    <FaWhatsapp />
                                    WhatsApp
                                </a>


                            </div>

                        </div>



                        {/* QUICK FACTS */}
                        <div className="
                            bg-gray-800
                            p-5
                            rounded-xl
                        ">

                            <h2 className="text-xl font-semibold">
                                Quick Facts:
                            </h2>


                            <ul className="
                                mt-5
                                space-y-4
                                text-white/90
                            ">

                                <li>
                                    🟢 Based in Rwanda, working globally
                                </li>

                                <li>
                                    🟢 Available for freelance projects
                                </li>

                                <li>
                                    🟢 Available for special projects and opportunities
                                </li>

                                <li>
                                    🟢 Response time: Usually within 24 hours
                                </li>

                            </ul>


                        </div>


                    </div>


                </div>

            </div>
        </section>
    )
}