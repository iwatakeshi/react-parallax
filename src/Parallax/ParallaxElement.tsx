import { useParallaxContainerContext } from './ParallaxContainer'
import React, { useState, useEffect, CSSProperties } from 'react'

export interface ParallaxElementProps {
  id?: string
  className?: string
  factor?: number
  style?: CSSProperties
  offset?: (factor: number) => number
}

export const ParallaxElement: React.FC<ParallaxElementProps> = (props) => {
  const { height, factor: scrollFactor } = useParallaxContainerContext()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (props.offset) {
      setOffset(props.offset(props.factor || 0.25))
    } else {
      setOffset(height * scrollFactor * (props.factor || 0.25))
    }
  }, [scrollFactor])

  if (props.style && props.style.transform) {
    delete props.style.transform
  }

  return <div
    id={props.id}
    className={props.className || 'parallax__element'}
    style={{ transform: `translate3d(0, ${offset}px, 0)`, ...props.style, willChange: 'transform' }}
  >
    {props.children}
  </div>
}