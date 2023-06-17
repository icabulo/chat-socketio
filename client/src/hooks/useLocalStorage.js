import { useEffect, useState } from "react";

const PREFIX = "PAQUERGO-chat";
export default function useLocalStorage(key, initialValue) {
  const prefixedKey = `${PREFIX}-${key}`;
  // console.log("INSIDE local", key, initialValue);

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    // console.log("ULS**->", jsonValue);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    // console.log("useEffect LS (VALUE)->", value);
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
