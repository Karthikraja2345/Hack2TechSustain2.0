import React, { useEffect, useRef, useState, useCallback } from 'react'

// Simple windowed list: expects fixed itemHeight for reliable virtualization
// props:
// - items: array of items
// - renderItem: (item, index) => ReactNode
// - itemHeight: number (px)
// - overscan: number of items to render before/after (default 3)
const SimpleVirtualList = ({ items = [], renderItem, itemHeight = 320, overscan = 3 }) => {
  const containerRef = useRef(null)
  const [scrollTop, setScrollTop] = useState(0)

  const onScroll = useCallback(() => {
    if (!containerRef.current) return
    setScrollTop(containerRef.current.scrollTop)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const containerHeight = containerRef.current ? containerRef.current.clientHeight : 600
  const totalHeight = items.length * itemHeight
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(items.length - 1, Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan)

  const topOffset = startIndex * itemHeight
  const visible = []
  for (let i = startIndex; i <= endIndex; i++) {
    const item = items[i]
    if (item) visible.push(renderItem(item, i))
  }

  return (
    <div ref={containerRef} style={{ height: '100%', overflowY: 'auto' }}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${topOffset}px)` }}>
          {visible}
        </div>
      </div>
    </div>
  )
}

export default React.memo(SimpleVirtualList)
