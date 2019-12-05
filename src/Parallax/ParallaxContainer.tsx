import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
  CSSProperties,
  FC
} from 'react'
import { useWindowSize } from '../hooks/window-size'
import { useWindowPageOffset } from '../hooks/window-page-offset'

export interface ParallaxContainerContextProps {
  width: number
  height: number
  factor: number
}

const ParallaxContainerContext = createContext<ParallaxContainerContextProps>({
  width: 0,
  height: 0,
  factor: 0
})

export interface ParallaxContainerProps {
  id?: string,
  className?: string
  style?: CSSProperties
}

export const ParallaxContainer: FC<ParallaxContainerProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollFactor, setScrollFactor] = useState(0)
  const [containerWidth, setcontainerWidth] = useState(0)
  const [containerHeight, setcontainerHeight] = useState(0)
  const { height: windowHeight } = useWindowSize()
  const { y: scrollY } = useWindowPageOffset()

  useEffect(() => {
    requestAnimationFrame(() => {
      if (ref && ref.current) {
        const rect = ref.current!.getBoundingClientRect()
        setcontainerWidth(rect.width)
        setcontainerHeight(rect.height)

        const viewportOffsetTop = rect.top
        const viewportOffsetBottom = windowHeight - viewportOffsetTop
        const factor = viewportOffsetBottom / (windowHeight + containerHeight)
        if (!isNaN(factor)) {
          setScrollFactor(factor)
        }
      }
    })
  }, [scrollY])

  return <ParallaxContainerContext.Provider value={{
    width: containerWidth,
    height: containerHeight,
    factor: scrollFactor
  }}>
    <div id={props.id} className={props.className || 'parallax'} ref={ref} style={props.style}>
      {props.children}
    </div>
  </ParallaxContainerContext.Provider>
}

export function useParallaxContainerContext() {
  const context = useContext(ParallaxContainerContext)
  if (!context) {
    throw new Error('ParallaxContainer compound components cannot be rendered outside the ParallaxContainer component')
  }
  return context
}