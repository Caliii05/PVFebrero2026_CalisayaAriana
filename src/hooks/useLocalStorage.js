import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  // Estado para almacenar el valor
  // Se usa una función de inicialización para que solo se ejecute una vez
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Si existe en el storage, lo devolvemos; si no, usamos el valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error al leer LocalStorage:", error);
      return initialValue;
    }
  });

  // Función para actualizar el valor en el estado y en LocalStorage
  const setValue = (value) => {
    try {
      // Permitimos que 'value' sea una función (estilo setState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error al guardar en LocalStorage:", error);
    }
  };

  return [storedValue, setValue];
}