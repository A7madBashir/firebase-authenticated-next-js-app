import { useState, useEffect } from "react";
import { LocalStorage } from "../models/DTO/localStorage";

function getStorageValue({ key, value }: LocalStorage) {
  // getting stored value
  const saved = localStorage.getItem(key) ?? "";
  const initial = JSON.parse(saved);
  return initial || value;
}

export const useLocalStorage = ({ key, value: defaultValue }: LocalStorage) => {
  const [value, setValue] = useState(() => {
    return getStorageValue({ key, value: defaultValue });
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
