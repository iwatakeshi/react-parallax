import { useState, useEffect } from 'react'

interface WindowPageOffset {
  x: number
  y: number
}

export function useWindowPageOffset(): WindowPageOffset {
  const [offset, setOffset] = useState<WindowPageOffset>({ x: 0, y: 0 })


  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handler = () => {
      setOffset({ x: window.pageXOffset, y: window.pageYOffset })
    }

    window.addEventListener('scroll', handler)

    return () => {
      window.removeEventListener('scroll', handler)
    }
  }, [])

  return offset
}