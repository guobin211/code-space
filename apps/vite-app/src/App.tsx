import React, { useRef, useState } from 'react';
import { AnimateBall } from './animation/AnimateBall';
import './styles/index.css';

export interface AppProps {
  url?: string;
}

const App: React.FC<AppProps> = () => {
  const ballRef = useRef<HTMLDivElement>(null);

  const animateBall = new AnimateBall();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { clientX, clientY } = e;
    console.log('clientX', clientX, clientY);
    if (ballRef.current) {
      const rect = ballRef.current?.getBoundingClientRect();
      animateBall.start(
        {
          x: clientX,
          y: clientY,
        },
        rect
      );
    }
  };

  const [className, setClassName] = useState('css-animate');
  const handleAnimate = () => {
    setClassName('css-animate css-end');
  };

  return (
    <div className='app'>
      <div className='item'>
        <div className='target' ref={ballRef}></div>
      </div>
      <div className='item'>
        <button className='btn' onClick={handleClick}>
          1
        </button>
        <button className='btn' onClick={handleClick}>
          2
        </button>
        <button className='btn' onClick={handleClick}>
          3
        </button>
      </div>
      <div className='item'>
        <button
          className='btn'
          onClick={() => {
            setClassName('css-animate');
          }}>
          reset
        </button>
      </div>
      <div className='item'>
        <div className={className} onClick={handleAnimate}></div>
      </div>
    </div>
  );
};

export default App;
