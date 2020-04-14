// https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj

import { useRef, useLayoutEffect } from 'react'

const isBrowser = typeof window !== `undefined`

function getScrollPosition({ element, useWindow }) {
  if (!isBrowser) return { x: 0, y: 0 }

  const target = element ? element.current : (document && document.body)
  const position = target.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

export function useScrollPosition(effect, dependencies, element, useWindow, wait) {
    // useref is used since a stateful value won't trigger re-render on each state change
    const position = useRef(getScrollPosition({ useWindow }))

    let throttleTimeout = null

    const callBack = () => {
        const currPos = getScrollPosition({ element, useWindow })
        effect({ prevPos: position.current, currPos })
        position.current = currPos
        throttleTimeout = null
    }

    // useLayoutEffect occures after DOM update but before paint
    useLayoutEffect(() => {
        const handleScroll = () => {
        if (wait) {
            if (throttleTimeout === null) {
            throttleTimeout = setTimeout(callBack, wait)
            }
        } else {
            callBack()
        }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, dependencies)
}
