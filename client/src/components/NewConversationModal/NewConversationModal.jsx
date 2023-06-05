/* eslint-disable react/prop-types */
import { useState } from "react";
import { useContacts } from "../../contexts/ContactsProvider";
import { useConversations } from "../../contexts/ConversationsProvider";
import { Button, Form, Modal } from "react-bootstrap";

function NewConversationModal({ closeModal }) {
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const [selectedContactIds, setSelectedContactIds] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds((prev) => {
      //else scenario= the checkbox has not been selected, then add it to the list
      // if scenario= the checkbox is on the list so remove it. i.e, return a new list without the id included
      if (prev.includes(contactId)) {
        return prev.filter((item) => {
          return contactId !== item;
        });
      } else {
        return [...prev, contactId];
      }
    });
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit" className="m-2">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
export default NewConversationModal;
