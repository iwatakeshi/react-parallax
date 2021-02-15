/**
 * Merges an array of class names into a single string (if defined).
 * @param classNames The list of class names.
 */
export default function mergeClassName(...classNames: (string | undefined)[]) {
  return classNames.filter(name => !!name).join(' ');
}
