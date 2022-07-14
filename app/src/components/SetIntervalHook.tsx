import React, { useState } from 'react';
import { useSetInterval } from '../hooks/use-set-interval';

const SetIntervalHook: React.FC = () => {
  const [options] = useState({ delay: 3000, immediate: true });
  const fetchData = () => {
    fetch('/index.html')
      .then(res => res.text())
      .then(() => {
        const r = Math.random();
        console.log('fetchData', r);
        if (r > 0.5) {
          clear();
        }
      });
  };
  const [clear] = useSetInterval(fetchData, options);
  const handleClick = () => {
    fetchData();
  };
  const handleStopClick = () => {
    clear();
  };
  return (
    <div>
      <img src="/static/rust.png" alt="" width={80} height={80} />
      <button type="button" onClick={handleClick}>
        fetch
      </button>
      <button type="button" onClick={handleStopClick}>
        stop
      </button>
    </div>
  );
};
export default SetIntervalHook;
