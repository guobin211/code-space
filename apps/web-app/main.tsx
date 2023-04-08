/// <reference types="vite-plugin-pages/client-react" />

import 'normalize.css/normalize.css';
import React, { memo, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import './index.scss';

const dom = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(dom);

const App = memo(() => <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
