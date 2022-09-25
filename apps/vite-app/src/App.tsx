import IndexPage from './pages/index.page';

export interface AppProps {
  url?: string;
  context?: Record<string, any>;
}

const App: React.FC<AppProps> = (props) => {
  if (import.meta.env.SSR) {
    console.log('SSR', props);
  }
  return <IndexPage></IndexPage>;
};

export default App;
