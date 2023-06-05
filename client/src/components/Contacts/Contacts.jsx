import { ListGroup } from "react-bootstrap";
import { useContacts } from "../../contexts/ContactsProvider";

function Contacts() {
  const { contacts } = useContacts();

  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => (
        <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
export default Contacts;

/* import { ListGroup } from "react-bootstrap";
import { useContext } from "react";
import { ContactsContext } from "../../contexts/contactsContext";

function Contacts() {
  const context = useContext(ContactsContext);
  const displayContacts = context.contacts;

  return (
    <ListGroup variant="flush">
      {displayContacts.map((contact) => (
        <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
export default Contacts;
 */
