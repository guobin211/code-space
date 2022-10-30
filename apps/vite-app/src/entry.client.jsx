import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getClientProps, getRootElement } from './shared';

const rootElement = getRootElement();
const appProps = getClientProps();

ReactDOM.hydrateRoot(rootElement, <App {...appProps} />);
