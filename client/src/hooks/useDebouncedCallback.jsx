import { useRef, useEffect } from 'react';

export const useDebouncedCallback = (callback, delay = 500) => {
  const timeoutRef = useRef();

  const debouncedFunction = (...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  // Limpiar timeout si el componente se desmonta
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return debouncedFunction;
};
