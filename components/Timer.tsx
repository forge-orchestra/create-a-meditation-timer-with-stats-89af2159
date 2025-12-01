import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/router';

interface TimerProps {
  initialMinutes: number;
  initialSeconds: number;
}

const Timer: React.FC<TimerProps> = ({ initialMinutes, initialSeconds }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const tick = useCallback(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    } else if (minutes > 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
    } else {
      setIsActive(false);
    }
  }, [minutes, seconds]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setInterval(tick, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, tick]);

  const handleStartPause = () => setIsActive(!isActive);
  const handleReset = () => {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setIsActive(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Meditation Timer</h1>
      <div className="text-6xl font-mono mb-4" aria-live="polite" aria-atomic="true">
        {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleStartPause}
          className="bg-blue-500 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label={isActive ? 'Pause timer' : 'Start timer'}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
          aria-label="Reset timer"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
};

export default Timer;