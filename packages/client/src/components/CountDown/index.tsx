import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endTimestamp: number;
}

export default function CountDown({endTimestamp}:CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  function calculateTimeLeft() {
    const currentTime = new Date().getTime();
    const difference = endTimestamp - currentTime;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTimestamp]);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{'--value':timeLeft.days} as React.CSSProperties}>15</span>
        </span>
        days
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{'--value':timeLeft.hours} as React.CSSProperties}></span>
        </span>
        hours
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{'--value':timeLeft.minutes} as React.CSSProperties}></span>
        </span>
        min
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{'--value':timeLeft.seconds} as React.CSSProperties}></span>
        </span>
        sec
      </div>
    </div>
  )
}