export const IS_SERVER = typeof window === 'undefined';
export const IS_CLIENT = !IS_SERVER && typeof document !== 'undefined';
export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_DEV = !IS_PROD;

export function checkDocument() {
  if (!IS_CLIENT) {
    return;
  }
  const rootElement = document.getElementById('root');
  const dataElement = document.getElementById('VITE_APP_PROPS');
  if (!(rootElement && dataElement)) {
    console.error('Invalid root element or data element');
  }
  return { rootElement, dataElement };
}
