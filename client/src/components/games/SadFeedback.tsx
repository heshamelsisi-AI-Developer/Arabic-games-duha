export default function SadFeedback() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center">
      {/* Large sad anime face */}
      <div className="relative">
        {/* Head */}
        <div className="sad-face-container">
          {/* Crying effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl animate-sad-bounce">😢</span>
          </div>
          
          {/* Tear drops */}
          <div className="absolute top-1/3 left-1/4 tear-drop" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/3 right-1/4 tear-drop" style={{ animationDelay: '0.2s' }} />
          <div className="absolute top-1/2 left-1/3 tear-drop" style={{ animationDelay: '0.4s' }} />
          <div className="absolute top-1/2 right-1/3 tear-drop" style={{ animationDelay: '0.1s' }} />
        </div>
      </div>

      <style>{`
        .sad-face-container {
          animation: sad-scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes sad-scale-in {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(-2deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .animate-sad-bounce {
          animation: sad-bounce 0.6s ease-in-out infinite;
        }

        @keyframes sad-bounce {
          0%, 100% {
            transform: translateY(0) scaleX(1);
          }
          25% {
            transform: translateY(-10px) scaleX(0.95);
          }
          50% {
            transform: translateY(0) scaleX(1);
          }
          75% {
            transform: translateY(5px) scaleX(1.05);
          }
        }

        .tear-drop {
          width: 8px;
          height: 12px;
          background: #4ECDC4;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          animation: tear-fall 1.5s ease-in forwards;
        }

        @keyframes tear-fall {
          0% {
            opacity: 1;
            transform: rotate(-45deg) translateY(0);
          }
          100% {
            opacity: 0;
            transform: rotate(-45deg) translateY(60px);
          }
        }
      `}</style>
    </div>
  );
}
