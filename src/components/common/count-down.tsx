import React, { memo } from 'react';
import { Statistic } from 'antd';
import type { CountdownProps } from 'antd';

type Props = {
  endTime: string;
  setTimer: React.Dispatch<React.SetStateAction<string | null>>;
};
const { Countdown } = Statistic;
const CountdownTimer = memo(({ endTime, setTimer }: Props) => {
  const onFinish: CountdownProps['onFinish'] = () => {
    setTimer(null);
  };

  return (
    <div className="primary-color-600">
      <Countdown
        value={new Date(endTime).getTime()}
        onFinish={onFinish}
        format="mm:ss"
      />
    </div>
  );
});

export default CountdownTimer;
