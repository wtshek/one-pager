export function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
): (...args: T) => ReturnType<typeof setTimeout> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return function (...args: T) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
    return timer;
  };
}
