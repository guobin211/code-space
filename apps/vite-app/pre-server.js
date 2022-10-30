import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IS_PROD = process.env.NODE_ENV === 'production';
const APP_TITLE = '<!--VITE_APP_TITLE-->';
const APP_HTML = '<!--VITE_APP_HTML-->';
const APP_PROPS = '<!--VITE_APP_PROPS-->';
const TEMPLATE = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const PORT = 5173;

const renderDocument = ({ title = '', html = '', props = '' }) => {
  return TEMPLATE.replace(APP_TITLE, title).replace(APP_HTML, html).replace(APP_PROPS, props);
};

const getProps = (props) => {
  return `<script id="VITE_APP_PROPS" type="application/json">${JSON.stringify(props)}</script>`;
};

async function createServer() {
  const app = express();
  let template, mod;
  if (!IS_PROD) {
    // 开发环境启用vite相关的功能
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
    template = await vite.transformIndexHtml(req.url, TEMPLATE);
    mod = await vite.ssrLoadModule('/src/entry.ssr.jsx');
  }
  app.use('*', async (req, res) => {
    if (IS_PROD) {
      template = TEMPLATE;
      mod = await import('./dist/server/entry.ssr.js');
    }
    console.log('vite.template');
    console.log(template);
    try {
      const { render, getServerSideProps } = mod;
      const props = await getServerSideProps(req);
      const appHtml = await render(req, props);
      const html = renderDocument({
        title: 'Vite',
        html: appHtml,
        props: getProps(props),
      });
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      !IS_PROD && vite.ssrFixStacktrace(e);
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  });
  app.listen(PORT, () => {
    console.log(`createServer: NODE_ENV=${process.env.NODE_ENV}, IS_PROD=${IS_PROD}`);
    console.log(`http://localhost:${PORT}`);
  });
}

createServer();
