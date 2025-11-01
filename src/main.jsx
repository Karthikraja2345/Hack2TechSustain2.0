import { StrictMode } from 'react'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Service worker: only register in production; in dev, ensure it's unregistered
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration.scope)
        })
        .catch((err) => console.warn('SW registration failed:', err))
    })
  } else {
    // Dev: unregister any existing SWs (prevents HMR/WebSocket issues)
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => r.unregister())
    })
    // Optionally clear runtime caches in dev
    if ('caches' in window) {
      caches.keys().then((keys) => keys.forEach((k) => caches.delete(k))).catch(() => {})
    }
  }
}

// Prefetch critical resources when browser is idle
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    // Prefetch critical images that will be needed soon
    const criticalImages = [
      '/images/slide3.webp',
      '/images/conference.webp',
      '/images/kottilingam.webp',
      '/images/kathiroli.webp'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Conditionally initialize AOS (Animate On Scroll) if loaded; disable on small screens
try {
  const initAOS = () => {
    const minWidth = 600
    const shouldEnable = typeof window !== 'undefined' && window.innerWidth >= minWidth
    if (window.AOS && typeof window.AOS.init === 'function') {
      window.AOS.init({
        once: true,
        disable: !shouldEnable,
        duration: 600,
        offset: 80
      })
    }
  }
  // Run after first paint
  if (typeof requestAnimationFrame === 'function') requestAnimationFrame(initAOS)
  else setTimeout(initAOS, 0)
} catch { /* ignore if AOS is not present */ }

// DEV: React.createElement patching disabled for build compatibility
/*
// This debugging code was causing build issues - disabled for now
if (import.meta.env.DEV && typeof window !== 'undefined') {
  // All jsx debugging code commented out for build compatibility
}
*/
