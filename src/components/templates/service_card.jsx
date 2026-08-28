import TiltCard from "../TiltCard";

export default function ServiceCard({ serviceNumber, serviceName, Service_description }) {
    return (
        <TiltCard maxTilt={9} className="group h-full">
            <div className="relative px-4 py-7 border border-white/15 bg-white/[0.02] text-gray-200 h-full
                transition-all duration-300 ease-out
                hover:border-[#80db66]/60 hover:bg-white/[0.04]
                hover:shadow-[0_10px_30px_rgba(139,207,122,0.15)]">

                {/* corner accents */}
                <div className="absolute top-0 left-0 w-3 h-3 bg-[#80db66] transition-all duration-300 group-hover:scale-125" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#80db66] transition-all duration-300 group-hover:scale-125" />

                {/* icon */}
                <div className="flex items-center gap-2">
                    <div className="w-14 h-14 bg-[#1c2a1f] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#243529]">
                        <span className="font-display text-2xl text-[#80db66] transition-transform duration-300 group-hover:scale-110">
                            {serviceNumber}
                        </span>
                    </div>
                    <h2 className="text-lg font-bold mb-4 transition-colors duration-300 group-hover:text-white">
                        {serviceName}
                    </h2>
                </div>

                {/* description */}
                <p className="text-sm text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
                    {Service_description}
                </p>
            </div>
        </TiltCard>
    );
}
