import { ReactNode } from "react";

interface NBELayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
}

export default function NBELayout({ children, currentStep, totalSteps }: NBELayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a4d2e] to-[#2d6b3f] flex flex-col items-center p-4 pt-8" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)`,
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* NBE Logo */}
        <div className="mb-4">
          <img
            src="/images/nbe-phonecash-logo.jpg"
            alt="NBE PhoneCash"
            className="w-20 h-20 md:w-24 md:h-24 rounded-xl shadow-lg"
          />
        </div>

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold text-white mb-1">محفظة الأهلي</h1>
        <p className="text-green-200/80 text-sm mb-4">NBE PhoneCash</p>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i + 1 <= currentStep
                    ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                    : "bg-white/30"
                }`}
              />
              {i < totalSteps - 1 && (
                <div
                  className={`w-8 h-0.5 transition-all duration-300 ${
                    i + 1 < currentStep ? "bg-yellow-400" : "bg-white/20"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 w-full">
          {children}
        </div>

        {/* SSL Footer */}
        <div className="mt-6 flex items-center gap-2 text-green-200/70">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs">اتصال آمن ومشفر SSL</span>
        </div>
      </div>
    </div>
  );
}
