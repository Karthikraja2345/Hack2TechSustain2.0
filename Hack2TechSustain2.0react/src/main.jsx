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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// DEV: detect any DOM nodes with an invalid `jsx` attribute to pinpoint the source
if (import.meta.env.DEV) {
  // Instrument React.createElement to catch any component passing a `jsx` prop
  try {
    if (!window.__jsxCreateElementPatched) {
      const origCreateElement = React.createElement
      React.createElement = function patchedCreateElement(type, props, ...children) {
        try {
          if (props && Object.prototype.hasOwnProperty.call(props, 'jsx')) {
            // eslint-disable-next-line no-console
            console.warn('[DEV] createElement called with forbidden `jsx` prop', {
              type: typeof type === 'string' ? type : (type?.displayName || type?.name || 'UnknownComponent'),
              props: { ...props, children: undefined },
              stack: new Error('jsx-prop-origin').stack
            })
          }
        } catch { /* noop */ }
        return origCreateElement(type, props, ...children)
      }
      // eslint-disable-next-line no-underscore-dangle
      window.__jsxCreateElementPatched = true
    }
  } catch { /* noop */ }

  // Simple utility to create a short, readable snippet of a node's outerHTML
  const snippet = (node) => {
    try {
      const html = node.outerHTML || ''
      return html.length > 400 ? `${html.slice(0, 400)}…` : html
    } catch {
      return String(node)
    }
  }

  // Scan and optionally strip the `jsx` attribute
  const scanAndClean = (nodes) => {
    const list = nodes ? Array.from(nodes).filter((n) => n && n.getAttribute && n.hasAttribute('jsx'))
                       : Array.from(document.querySelectorAll('[jsx]'))
    if (list.length) {
      // eslint-disable-next-line no-console
      console.warn('[DEV] Found element(s) with invalid `jsx` attribute:',
        list.map((el) => ({ tag: el.tagName, id: el.id, class: el.className, html: snippet(el) })))
      // Strip attribute to prevent repeated warnings while we locate the source
      list.forEach((el) => {
        try { el.removeAttribute('jsx') } catch { /* noop */ }
      })
    }
  }

  // Initial scan after first paint
  setTimeout(() => { scanAndClean() }, 0)

  // Guard against duplicate observers on HMR
  try { window.__jsxAttrObserver?.disconnect?.() } catch { /* noop */ }

  // Observe for any future insertions/attribute changes that include `jsx`
  try {
    const observer = new MutationObserver((mutations) => {
      const candidates = []
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'jsx' && m.target) {
          candidates.push(m.target)
        }
        if (m.type === 'childList') {
          m.addedNodes && m.addedNodes.forEach((n) => {
            if (n.nodeType === 1) {
              // Element node: check itself and its subtree
              if (n.hasAttribute && n.hasAttribute('jsx')) candidates.push(n)
              const nested = n.querySelectorAll ? n.querySelectorAll('[jsx]') : []
              if (nested && nested.length) candidates.push(...Array.from(nested))
            }
          })
        }
      }
      if (candidates.length) scanAndClean(candidates)
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['jsx'],
      childList: true,
      subtree: true,
    })
    // Expose for HMR clean-up
    // eslint-disable-next-line no-underscore-dangle
    window.__jsxAttrObserver = observer
  } catch { /* noop */ }
}
