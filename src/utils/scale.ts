// Scale between AKA normalize
export default function scale(
  value: number,
  newMin: number,
  newMax: number,
  oldMin: number,
  oldMax: number
) {
  return ((newMax - newMin) * (value - oldMin)) / (oldMax - oldMin) + newMin;
}
