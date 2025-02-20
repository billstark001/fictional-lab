import { useCallback, useEffect, useState } from 'react';
import { useCallbackRef } from '@/lib/react/useCallbackRef';

export type Theme = 'dark' | 'light'

export const darkModeQuery = '[data-theme=\'dark\']';
export const lightModeQuery = `[data-theme]:not(${darkModeQuery})`;

export const isSystemThemeDark = () => (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ?? false;

export const getTheme = (systemQuery = false): Theme | undefined => {
  if (typeof document === 'undefined') {
    // server-side
    return undefined;
  }
  const theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'dark' || theme === 'light') {
    return theme;
  }
  if (systemQuery) {
    return isSystemThemeDark() ? 'dark' : 'light';
  }
  return undefined;
};

export const injectTheme = (theme: Theme) => document.documentElement.setAttribute('data-theme', theme);

export const loadAndInjectThemeFromLocalStorage = () => {
  const savedTheme = localStorage.getItem('theme') as Theme;
  if (savedTheme) {
    injectTheme(savedTheme);
    return savedTheme;
  }
  injectTheme(isSystemThemeDark() ? 'dark' : 'light');
  return undefined;
};


export const injectThemeScript = `
(() => {
  ${isSystemThemeDark.name} = ${isSystemThemeDark};
  ${injectTheme.name} = ${injectTheme};
  ${loadAndInjectThemeFromLocalStorage.name} = ${loadAndInjectThemeFromLocalStorage};
  ${loadAndInjectThemeFromLocalStorage.name}();
})();
`;

export const useThemeQuery = () => {
  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    setTheme(getTheme(true));
    const observer = new MutationObserver((m) => {
      for (const mutation of m) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          setTheme(getTheme(true));
        }
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return theme;
};

export const useTheme = () => {
  const [theme, _setTheme] = useState<Theme>();

  const refreshTheme = useCallback(
    () => _setTheme(getTheme(true)),
    [_setTheme]
  );

  useEffect(() => {
    const savedTheme = loadAndInjectThemeFromLocalStorage();
    if (savedTheme) {
      _setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = useCallbackRef(() => {
    const newTheme = (
      theme ?? (isSystemThemeDark() ? 'dark' : 'light')
    ) === 'light' ? 'dark' : 'light';
    _setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  });

  const setTheme = useCallback((theme?: Theme | 'auto') => {
    if (theme === 'auto' || !theme) {
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = isDarkMode ? 'dark' : 'light';
    }
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return {
    theme,
    refreshTheme,
    toggleTheme,
    setTheme,
  };
};