// Ensure window.fetch has a valid setter in sandbox environments
try {
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
} catch {
  // safe fallback
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
