/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

const ConversationsContext = createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  const socket = useSocket();

  function createConversation(recipients) {
    setConversations((prev) => {
      return [...prev, { recipients, messages: [] }];
    });
  }

  /*   function addMessageToConversation({ recipients, text, sender }) {
    setConversations((prev) => {
      let madeChaged = false;
      const newMessage = { sender, text };
      const newConversations = prev.map((conversation) => {
        if (arrayEquiality(conversation.recipients, recipients)) {
          madeChaged = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }
        return conversation;
      });
      if (madeChaged) {
        return newConversations;
      } else {
        return [...prev, { recipients, messages: [newMessage] }];
      }
    });
  } */

  // useCallback prevents that addMessageToConversation runs everysingle time the component re-renders
  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prev) => {
        let madeChaged = false;
        const newMessage = { sender, text };
        const newConversations = prev.map((conversation) => {
          if (arrayEquiality(conversation.recipients, recipients)) {
            madeChaged = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });
        if (madeChaged) {
          return newConversations;
        } else {
          return [...prev, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;

    // beware that "recieve-message" data is formated so that the function addMessageToConversation can be called right away and use that object as a parameter.
    socket.on("recieve-message", addMessageToConversation);

    // take that socket and remove that event listener when component is unmounted
    return () => {
      socket.off("recieve-message");
    };
  }, [socket, addMessageToConversation]);

  function sendMessage(recipients, text) {
    socket.emit("send-message", { recipients, text });
    addMessageToConversation({ recipients, text, sender: id });
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const initialState = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  };

  return (
    <ConversationsContext.Provider value={initialState}>
      {children}
    </ConversationsContext.Provider>
  );
}

function arrayEquiality(a, b) {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();
  return a.every((element, index) => {
    return element === b[index];
  });
}
