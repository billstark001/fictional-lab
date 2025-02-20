import { useCallback, useEffect, useRef } from 'react';

export const useCallbackRef = <T extends (...args: any[]) => any>(
  callback: T | undefined,
): T => {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });
  return useCallback(((...args: any[]) => callbackRef.current?.(...args)) as T, []);
};