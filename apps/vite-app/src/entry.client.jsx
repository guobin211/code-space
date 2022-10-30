import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
const dataElement = document.getElementById('VITE_APP_PROPS');

if (rootElement && dataElement) {
  const root = ReactDOM.createRoot(rootElement);
  const appProps = JSON.parse(dataElement.textContent);
  ReactDOM.hydrateRoot(root, <App {...appProps} />);
} else {
  console.error('Invalid root element or data element');
}
