// Ensure window.fetch has a valid setter in sandbox environments
try {
  if (typeof window !== 'undefined') {
    const desc = Object.getOwnPropertyDescriptor(window, 'fetch') || Object.getOwnPropertyDescriptor(Window.prototype, 'fetch');
    if (desc && typeof desc.set !== 'function') {
      let currentFetch = window.fetch ? window.fetch.bind(window) : undefined;
      Object.defineProperty(window, 'fetch', {
        get: () => currentFetch,
        set: (val) => {
          currentFetch = val;
        },
        configurable: true,
        enumerable: true,
      });
    }
  }
} catch {
  // safe fallback
}

import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

export const createRoot = ViteReactSSG({
  routes,
});

export const createApp = createRoot;
export default createRoot;
