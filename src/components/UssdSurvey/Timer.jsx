import React, { useEffect, useState } from "react";

export default function Timer({ datetime, expiry_time, id, status, short_code_status }) {
  const FULL_DASH_ARRAY = 283;
  const WARNING_THRESHOLD = 20 * 60; // 20 minutes in seconds
  const ALERT_THRESHOLD = 15 * 60; // 15 minutes in seconds

  const COLOR_CODES = {
    info: "text-green-500",
    warning: "text-orange-500",
    alert: "text-red-500",
  };

  const [timeLeft, setTimeLeft] = useState(0);
  const [remainingPathColor, setRemainingPathColor] = useState(
    COLOR_CODES.info
  );

  useEffect(() => {
    const startTime = new Date(datetime).getTime();
    const endTime = new Date(expiry_time).getTime();
    const totalSeconds = Math.floor((endTime - startTime) / 1000);

    if (status === 2 && short_code_status === 2) {
      setTimeLeft(0);
      setCircleDasharray(0, totalSeconds);
      setRemainingPathColorClass(0);
      return;
    }

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const calculatedTimeLeft = Math.max(
        0,
        Math.floor((endTime - currentTime) / 1000)
      );

      setTimeLeft(calculatedTimeLeft);
      setCircleDasharray(calculatedTimeLeft, totalSeconds);
      setRemainingPathColorClass(calculatedTimeLeft);

      if (calculatedTimeLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [datetime, expiry_time, status]);

  // Format the time to display as hours and minutes
  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  function calculateTimeFraction(time, totalSeconds) {
    const rawTimeFraction = time / totalSeconds;
    return rawTimeFraction - (1 / totalSeconds) * (1 - rawTimeFraction);
  }

  function setCircleDasharray(timeLeft, totalSeconds) {
    const circleDasharray = `${(
      calculateTimeFraction(timeLeft, totalSeconds) * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById(`base-timer-path-remaining-${id}`)
      .setAttribute("stroke-dasharray", circleDasharray);
  }

  function setRemainingPathColorClass(timeLeft) {
    if (timeLeft <= ALERT_THRESHOLD) {
      setRemainingPathColor(COLOR_CODES.alert);
    } else if (timeLeft <= WARNING_THRESHOLD) {
      setRemainingPathColor(COLOR_CODES.warning);
    } else {
      setRemainingPathColor(COLOR_CODES.info);
    }
  }

  return (
    <div id={id} className="flex items-center justify-start">
      <div className="relative w-36 h-36 base-timer">
        <svg
          className="base-timer__svg transform scale-x-[-1]"
          viewBox="0 0 100 100"
        >
          <g className="base-timer__circle">
            <circle
              className="base-timer__path-elapsed stroke-gray-200 fill-none"
              cx="50"
              cy="50"
              r="45"
            ></circle>
            <path
              id={`base-timer-path-remaining-${id}`}
              strokeDasharray="283"
              stroke="currentColor"
              className={`base-timer__path-remaining stroke-[3px] stroke-linecap-round rotate-[90deg] origin-center ${remainingPathColor} fill-none`}
              d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
            ></path>
          </g>
        </svg>
        <span
          id={`base-timer-label-${id}`}
          className="absolute inset-0 flex items-center justify-center text-xl font-semibold base-timer__label"
        >
          {formatTime(timeLeft)}
        </span>
      </div>
    </div>
  );
}
