import { ReactNode } from "react";

interface NBELayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
}

export default function NBELayout({ children, currentStep, totalSteps }: NBELayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a4d2e] to-[#2d6b3f] flex flex-col items-center justify-center p-4" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)`,
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Single White Card - everything inside */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 w-full">
          {/* NBE Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="/images/nbe-phonecash-logo.jpg"
              alt="NBE PhoneCash"
              className="w-16 h-16 md:w-20 md:h-20 rounded-xl shadow-md"
            />
          </div>

          {/* Step Indicator - green dots */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i + 1 <= currentStep
                      ? "bg-green-500 shadow-lg shadow-green-400/50"
                      : "bg-gray-300"
                  }`}
                />
                {i < totalSteps - 1 && (
                  <div
                    className={`w-8 h-0.5 transition-all duration-300 ${
                      i + 1 < currentStep ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Page Content */}
          {children}
        </div>

        {/* SSL Footer - matching original */}
        <div className="mt-6 flex items-center justify-center gap-2 text-green-200/80">
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs">
            محمي بتشفير SSL 256-bit | محفظة الاهلي فون كاش المصري © 2024
          </span>
        </div>
      </div>
    </div>
  );
}
