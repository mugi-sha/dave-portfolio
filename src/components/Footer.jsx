import { FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

export default function Footer() {
    return (
        <div className="w-full py-6 sm:py-8 bg-black border-t border-[#80db66] text-white flex flex-col justify-center items-center px-5">
            <div className="flex items-center gap-6 sm:gap-8 mb-3">
                <img src="/logo.svg" alt="M logo" className="h-10 w-10 sm:h-12 sm:w-12" />
            </div>
            <div className="flex gap-4 sm:gap-5 text-xl lg:gap-6 lg:text-3xl">

                <button>
                    <a href="https://github.com/mugi-sha" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="hover:text-[#80db66] cursor-pointer" />
                    </a>
                </button>
                <button>
                    <a href="https://instagram.com/davidmenelik" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="hover:text-[#80db66] cursor-pointer" />
                    </a>
                </button>
                <button>
                    <a href="https://wa.me/250796888684" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp className="hover:text-[#80db66] cursor-pointer" />
                    </a>
                </button>
                <button>
                    <a href="mailto:mugishadavid910@gmail.com">
                        <SiGmail className="hover:text-[#80db66] cursor-pointer" />
                    </a>
                </button>

            </div>
            <div className="text-xs sm:text-sm lg:text-base text-white/75 mt-2">
                <p>&copy;2026 mugisha david. Coding For World</p>
            </div>
        </div>
    )
}