interface WaitingOverlayProps {
  message?: string;
}

export default function WaitingOverlay({ message = "جاري المعالجة..." }: WaitingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-green-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#2d6b3f] animate-spin"></div>
          <div className="absolute inset-3 rounded-full border-4 border-transparent border-b-[#1a4d2e] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>

        {/* Message */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">يرجى الانتظار</h3>
        <p className="text-gray-500 text-sm">{message}</p>

        {/* Animated dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          <div className="w-2 h-2 bg-[#2d6b3f] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-[#2d6b3f] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-[#2d6b3f] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
