import { createContext } from "react";

export const initialContext = {
  contacts: JSON.parse(localStorage.getItem("WAChat-clone-contacts")) || [],
};

export const ContactsContext = createContext(initialContext);
