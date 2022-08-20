import { Callback, VoidCallback } from '../interfaces/callback'

export const { setTimeout, clearTimeout } = globalThis

export const { setInterval, clearInterval } = globalThis

// From {@link https://stackoverflow.com/questions/27078285/simple-throttle-in-javascript}
export function throttle<T extends Callback>(callback: T, delay: number): T {
  let waiting = false
  let result: ReturnType<typeof callback>

  return function (...args: unknown[]) {
    if (!waiting) {
      result = callback(...args)
      waiting = true
      setTimeout(() => (waiting = false), delay)
    }

    return result
  } as T
}

// From {@link https://stackoverflow.com/questions/27078285/simple-throttle-in-javascript}
export function debounce<T extends VoidCallback>(callback: T, delay: number): T {
  let timeout: ReturnType<typeof setTimeout>

  return function (...args: unknown[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => callback(...args), delay)
  } as T
}

export function sleep(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time))
}
