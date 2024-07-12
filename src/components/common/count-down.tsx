import React, { memo, useCallback, useEffect, useState } from 'react';

type CountdownProps = {
  endTime: string;
  setTimer: React.Dispatch<React.SetStateAction<string | null>>;
};

const Countdown = memo(({ endTime, setTimer }: CountdownProps) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = new Date(endTime).getTime() - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [endTime]);

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (Object.keys(newTimeLeft).length === 0) {
        clearInterval(timer);
        setTimer(null);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTime]);

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval} className="count-down-timer neutral-color-500">
        {timeLeft[interval]} {interval}{' '}
      </span>,
    );
  });

  return (
    <div className="primary-color-600">
      {timerComponents.length ? timerComponents : null}
    </div>
  );
});

export default Countdown;
