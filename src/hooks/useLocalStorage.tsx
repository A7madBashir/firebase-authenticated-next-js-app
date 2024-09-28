"use client";
import { useState, useEffect } from "react";
import { LocalStorage } from "../models/DTO/localStorage";
import { isEmpty } from "../utils/isEmpty";

function getStorageValue({ key, value }: LocalStorage) {
  if (typeof window == typeof undefined) return "";
  
  // getting stored value
  const saved = localStorage.getItem(key);
  const initial = isEmpty(saved) ? "" : JSON.parse(saved!);
  return initial || value;
}

export default function useLocalStorage({
  key,
  value: defaultValue,
}: LocalStorage) {
  const [value, setValue] = useState(() => {
    return getStorageValue({ key, value: defaultValue });
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
