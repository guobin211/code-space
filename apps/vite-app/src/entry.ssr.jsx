import ReactDOMServer from 'react-dom/server';
import App from './App';

export function render(url, context) {
  return ReactDOMServer.renderToString(<App context={context} url={url} />);
}

export default render;
