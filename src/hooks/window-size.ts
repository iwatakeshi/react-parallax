/**
 * useWindowSize
 * https://usehooks.com/useWindowSize/
 */
import { useState, useEffect } from 'react'

interface WindowSize {
  width: number
  height: number
}

export function useWindowSize(): WindowSize {

  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    function handle() {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  return size
}
