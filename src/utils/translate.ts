/* eslint-disable */
export type Unit =
  | `px`
  | `rem`
  | `em`
  | `%`
  | `in`
  | `cm`
  | `mm`
  | `Q`
  | `pc`
  | `pt`
// TODO: Watch out for https://github.com/microsoft/TypeScript/pull/41891
export type Value = `${number}${Unit}` | 0 | string

export type TranslateX = `translateX(0)`| `translateX(${number}${Unit})`

export type TranslateY = `translateY(0)`| `translateY(${number}${Unit})`

export type Translate3d =
  `translate3d(0,0,0)` | `translate3d(0, 0, 0)` |
  `translate3d(${number}${Unit},${number}${Unit},${number}${Unit})`



export function translateX(x: Value): TranslateX {
  return `translateX(${x})` as TranslateX
}

export function translateY(y: Value): TranslateY {
return `translateY(${y})` as TranslateY
}

export function translate3d(
  x: Value,
  y: Value,
  z: Value): Translate3d {
  return `translate3d(${x}, ${y}, ${z})` as Translate3d
}