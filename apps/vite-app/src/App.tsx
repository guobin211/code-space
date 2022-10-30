import React from 'react';
import { useEffect } from 'react';

export interface AppProps {
  url?: string;
}

export interface IndexPageProps {
  id?: string;
}

const IndexPage: React.FC<IndexPageProps> = (props) => {
  const { id } = props;
  return (
    <div id={id}>
      <h1>IndexPageProps</h1>
      <button className='my-btn'>hello</button>
    </div>
  );
};

const App: React.FC<AppProps> = (props) => {
  useEffect(() => {
    console.log('AppProps', props);
  }, []);

  return <IndexPage></IndexPage>;
};

export default App;
