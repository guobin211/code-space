import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getRootElement } from './shared';

const rootElement = getRootElement();

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
