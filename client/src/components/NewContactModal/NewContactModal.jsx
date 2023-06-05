/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../../contexts/ContactsProvider";

function NewContactModal({ closeModal }) {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();

  function handleSubmit(e) {
    e.preventDefault();

    const newContactData = {
      id: idRef.current.value,
      name: nameRef.current.value,
    };

    createContact(newContactData.id, newContactData.name);

    closeModal();
  }

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Button type="submit" className="m-2">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
export default NewContactModal;

/* 
import { useRef, useContext, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ContactsContext } from "../../contexts/contactsContext";

function NewContactModal({ closeModal }) {
  const context = useContext(ContactsContext);
  const idRef = useRef();
  const nameRef = useRef();

  const updateContact = (item) => {
    context.contacts = [...context.contacts, item];
  };

  function handleSubmit(e) {
    e.preventDefault();

    const newContactData = {
      id: idRef.current.value,
      name: nameRef.current.value,
    };

    updateContact(newContactData);

    closeModal();
  }

  useEffect(() => {
    localStorage.setItem(
      "WAChat-clone-contacts",
      JSON.stringify(context.contacts)
    );
  }, [context.contacts]);

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Button type="submit" className="m-2">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
export default NewContactModal;
 */
