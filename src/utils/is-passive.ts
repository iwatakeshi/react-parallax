/** Determines if a browser supports passive scrolling */
export default function isPassive() {
  if (typeof window === 'undefined') return false;

  let passive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        passive = true;
        return passive;
      },
    });
    const noop = () => {};
    window.addEventListener('p', noop, opts);
    window.removeEventListener('p', noop, opts);
  } catch (e) {}
  return passive;
}
