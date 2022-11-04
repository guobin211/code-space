export const IS_SERVER = typeof window === 'undefined';
export const IS_CLIENT = !IS_SERVER && typeof document !== 'undefined';
export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_DEV = !IS_PROD;

export function getRootElement(): HTMLElement {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Invalid root element');
  }
  return rootElement;
}

export function getClientProps(): Record<string, unknown> {
  const dataElement = document.getElementById('VITE_APP_PROPS');
  if (dataElement) {
    return JSON.parse(dataElement.textContent || '{}');
  } else {
    console.warn('No data element found id = "VITE_APP_PROPS"');
  }
  return {};
}
