import React from "react";

export default function LiveButton({ children, status }) {
  // Define color mappings for different statuses
  const statusColors = {
    1: "bg-orange-500",
    2: "bg-green-500",
    3: "bg-rose-500",
    4: "bg-green-500",
    5: "bg-violet-500",
    default: "bg-rose-500",
  };

  const statusAnimationColors = {
    1: "bg-orange-500/60",
    2: "bg-green-500/60",
    3: "bg-rose-500/60",
    4: "bg-green-500/60",
    5: "bg-violet-500/60",
    default: "bg-rose-500/60",
  };

  // Determine colors based on status
  const iconColor = statusColors[status] || statusColors.default;
  const animationColor =
    statusAnimationColors[status] || statusAnimationColors.default;

  return (
    <div className="flex items-center justify-start">
    <button
      type="button"
      className="relative inline-flex items-center font-bold py-2.5 px-8 bg-white/90 text-gray-900 rounded-full border border-white shadow-md transition-transform duration-200 hover:-translate-y-1 active:px-[23.75px] active:shadow-inner"
    >
      {children}
  
      {/* Live Icon */}
      <span
        className={`inline-block relative ml-3 ${iconColor} w-2.5 h-2.5 rounded-full border border-black/10`}
      >
        <span
          className={`absolute top-0 left-0 w-full h-full rounded-full ${animationColor} animate-live`}
        ></span>
      </span>
    </button>
  
    {/* Keyframes Animation */}
    <style jsx>{`
      @keyframes live {
        0% {
          transform: scale(1);
          background-color: rgba(255, 0, 0, 0.6);
        }
        100% {
          transform: scale(3.5);
          background-color: rgba(255, 0, 0, 0);
        }
      }
      .animate-live {
        animation: live 1.5s ease-in-out infinite;
      }
    `}</style>
  </div>
  
  );
}
