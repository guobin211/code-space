import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App, { AppProps } from './App';
import { Request } from 'express';
/**
 * 服务端渲染
 * @param {import('express').Request} req
 * @param {import('./App').AppProps} props
 * @returns
 */
export async function render(req: Request, props: AppProps) {
  const { url } = req;
  const html = ReactDOMServer.renderToString(<App {...props} />);
  console.log('request url');
  console.log(url);
  console.log('ssr render html');
  console.log(html);
  return html;
}

/**
 * 服务端逻辑
 * @param {import('express').Request} req
 * @returns {Promise<{props: object}>}
 */
export async function getServerSideProps(req: Request) {
  const { url } = req;
  return {
    props: {
      url,
    },
  };
}