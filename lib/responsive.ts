import { useEffect, useState } from "react";

// width < value -> the current breakpoint is key
export const breakpoints = Object.freeze({
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1200,
  xl2: 2048,
});

type Breakpoint = keyof typeof breakpoints;

const breakpointOrder: readonly Breakpoint[] = ['sm', 'md', 'lg', 'xl', 'xl2'];
const lastBreakpoint: Readonly<Record<Breakpoint, Breakpoint | undefined>> = {
  sm: undefined,
  md: 'sm',
  lg: 'md',
  xl: 'lg',
  xl2: 'xl',
};

export const mediaQueryMoreOrEqual = (size: keyof typeof breakpoints, prefix = true) =>
  `${prefix ? '@media ' : ''}(min-width: ${breakpoints[lastBreakpoint[size]!] ?? 0}px)`;

export const mediaQueryLessOrEqual = (size: keyof typeof breakpoints, prefix = true) =>
  `${prefix ? '@media ' : ''}(max-width: ${breakpoints[size] - 1}px)`;

export const mediaQueryOnRange = (left: keyof typeof breakpoints, right?: keyof typeof breakpoints, prefix = true) => {

  const leftValue = breakpoints[lastBreakpoint[left]!] ?? 0;
  const rightValue = breakpoints[right ?? left] ?? 0;

  const ret = `(min-width: ${leftValue}px) and (max-width: ${rightValue}px)`;

  if (prefix) {
    return '@media ' + ret;
  }
  return ret;
};

export function useBreakpoint(): Breakpoint {
  const [value, setValue] = useState<Breakpoint>('lg');

  useEffect(() => {

    const mediaQueries = breakpointOrder.map((bp, i) => [
      bp, window.matchMedia(
        i == 0
          ? mediaQueryLessOrEqual(bp, false)
          : i == breakpointOrder.length - 1
            ? mediaQueryMoreOrEqual(bp, false)
            : mediaQueryOnRange(bp, undefined, false)
      )
    ] satisfies [Breakpoint, MediaQueryList]);


    function handleChange() {
      setValue(breakpointOrder[mediaQueries.findIndex(([, q]) => q.matches)]);
    }

    handleChange();

    mediaQueries.forEach(([, mq]) => {
      mq.addEventListener('change', handleChange);
    });

    return () => {
      mediaQueries.forEach(([, mq]) => {
        mq.removeEventListener('change', handleChange);
      });
    };
  }, []);

  return value;
}