import React from 'react';
import { useEffect } from 'react';
import IndexPage from './pages/index.page';

export interface AppProps {
  url?: string;
}

const App: React.FC<AppProps> = (props) => {
  useEffect(() => {
    console.log('AppProps', props);
  }, []);

  return <IndexPage></IndexPage>;
};

export default App;
