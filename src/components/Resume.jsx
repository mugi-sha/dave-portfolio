import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import {
    SiPython,
    SiJavascript,
    SiPostman,
    SiTailwindcss,
    SiGithub,
    SiHtml5,
    SiCss3,
    SiDjango,
    SiFastapi,
    SiReact,
    SiNodedotjs,
    SiMongodb,
    SiMysql,
    SiPostgresql
} from "react-icons/si";

// Step 1: Put all your tab content in one place.
const resumeData = {
    education: {
        title: "My education",
        description:
            "A blend of formal education and self-directed learning, focusing on Computer Science, Economics, and various programming technologies.",
        items: [
            { date: "2023 - 2024", role: "AI & Machine Learning Training", company: "IBM" },
            { date: "2024 - 2025", role: "The Complete Full-Stack Web Development Bootcamp", company: "Coursera" },
            { date: "2025 - 2026", role: "Cloud Computing Specialization", company: "Google" },
            { date: "2026 - Present", role: "Full-Stack Development Certification", company: "freeCodeCamp" },
        ],
    },
    skills: {
        title: "My skills",
        description:
            "A diverse set of programming languages and technologies, with a focus on software engineering, web development, and data structures.",
    },
};

// Icon list for the Skills tab
const skillsList = [
    { icon: SiPython, name: "Python" },
    { icon: SiJavascript, name: "JavaScript" },
    { icon: SiGithub, name: "GitHub" },
    { icon: SiPostman, name: "Postman" },
    { icon: SiNodedotjs, name: "Node.js" },
    { icon: SiHtml5, name: "HTML5" },
    { icon: SiCss3, name: "CSS3" },
    { icon: SiTailwindcss, name: "TailwindCSS" },
    { icon: SiPostgresql, name: "Postgresql" },
    { icon: SiMongodb, name: "Mongodb" },
    { icon: SiDjango, name: "Django" },
    { icon: SiFastapi, name: "FastAPI" },
    { icon: SiReact, name: "React" },
    { icon: SiMysql, name: "MySQL" },
];

const tabs = [
    { key: "education", label: "Education" },
    { key: "skills", label: "Skills" },
];

export default function Resume() {
    const [activeTab, setActiveTab] = useState("education");
    const activeContent = resumeData[activeTab];

    return (
        <section id="resume" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-black py-16 sm:py-20 px-5 sm:px-8">

            <div className="max-w-6xl mx-auto w-full">

                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        My <span className="text-[#80db66]">Resume</span>
                    </h1>

                    <div className="w-24 h-1 bg-[#80db66] mx-auto rounded-full"></div>
                </div>



                <div className="flex flex-col md:flex-row min-h-[500px] rounded-xl overflow-hidden gap-6">


                    {/* Tabs */}
                    <div className="
            w-full 
            md:w-[30%]
            flex 
            md:flex-col
            flex-row
            gap-3
            overflow-x-auto
            md:overflow-visible
        ">

                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`
                    min-w-fit
                    md:w-full
                    text-sm
                    md:text-lg
                    py-3
                    px-5
                    rounded-lg
                    cursor-pointer
                    transition-all
                    
                    ${activeTab === tab.key
                                        ?
                                        "bg-[#80db66] text-black"
                                        :
                                        "bg-gray-800 text-white hover:bg-gray-700"
                                    }
                    `}
                            >
                                {tab.label}
                            </button>
                        ))}


                        <button
                            className="
            hidden
            md:flex
            gap-2
            bg-[#80db66]
            text-black
            items-center
            justify-center
            py-3
            rounded-full
            mt-4
            "
                        >
                            <FaEye />
                            View Resume
                        </button>

                    </div>




                    {/* Content */}
                    <div className="
            w-full
            md:w-[70%]
            flex
            flex-col
            text-white
            md:pl-5
        ">


                        <div>

                            <h3 className="font-medium text-xl">
                                {activeContent.title}
                            </h3>


                            <p className="
                    mt-3
                    text-white/80
                    text-sm
                    md:text-base
                    leading-relaxed
                ">
                                {activeContent.description}
                            </p>

                        </div>




                        <div
                            className={`
            mt-6
            max-h-[450px]
            overflow-y-auto
            pr-2
            custom-scrollbar
            grid
            gap-4

            ${activeTab === "skills"
                                    ?
                                    "grid-cols-2 md:grid-cols-4"

                                    :
                                    "grid-cols-1 md:grid-cols-2"
                                }

            `}
                        >



                            {/* Skills */}
                            {activeTab === "skills" && (
                                skillsList.map((skill, index) => {

                                    const Icon = skill.icon;

                                    return (
                                        <div
                                            key={index}
                                            className="
                        h-28
                        bg-gray-800
                        rounded-xl
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-2
                        hover:bg-gray-700
                        transition
                        "
                                        >

                                            <Icon className="text-3xl md:text-4xl" />

                                            <span className="text-xs text-white/70">
                                                {skill.name}
                                            </span>

                                        </div>
                                    )
                                })
                            )}



                            {/* Education */}
                            {activeTab !== "skills" && (

                                activeContent.items.map((item, index) => (

                                    <div
                                        key={index}
                                        className="
                    min-h-40
                    border
                    border-white/20
                    p-5
                    rounded-xl
                    bg-gray-900/40
                    "
                                    >

                                        <p className="text-[#80db66]">
                                            {item.date}
                                        </p>


                                        <h2 className="
                    text-lg
                    md:text-xl
                    font-medium
                    mt-2
                    ">
                                            {item.role}
                                        </h2>


                                        <p className="text-white/70 mt-4">
                                            &gt; {item.company}
                                        </p>


                                    </div>

                                ))

                            )}


                        </div>



                        {/* Mobile Resume button */}
                        <button
                            className="
            md:hidden
            flex
            gap-2
            bg-[#80db66]
            text-black
            items-center
            justify-center
            py-3
            rounded-full
            mt-6
            "
                        >
                            <FaEye />
                            View Resume
                        </button>



                    </div>


                </div>

            </div>

        </section>
    );
}