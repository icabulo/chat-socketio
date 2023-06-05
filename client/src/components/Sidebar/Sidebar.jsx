/* eslint-disable react/prop-types */
import { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import { Conversations } from "../Conversations";
import { Contacts } from "../Contacts";
import { NewContactModal } from "../NewContactModal";
import { NewConversationModal } from "../NewConversationModal";

function Sidebar({ id }) {
  const CONVERSATIONS_KEY = "conversations";
  const CONTACTS_KEY = "contacts";
  const [activeTab, setActiveTab] = useState(CONVERSATIONS_KEY);
  const conversationsOpen = activeTab === CONVERSATIONS_KEY;
  const [modalOpen, setmodalOpen] = useState(false);
  function closeModal() {
    setmodalOpen(false);
  }

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Nav className="text-capitalize justify-content-center" variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>
              {CONVERSATIONS_KEY}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>{CONTACTS_KEY}</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content
          className="border-right overflow-auto flex-grow-1"
          style={{ borderRight: "1px solid #e0e0e0" }}
        >
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div
          className="p-2 border-top border-right small"
          style={{ borderRight: "1px solid #e0e0e0" }}
        >
          Your Id: <span className="text-muted">{id}</span>
        </div>
        <Button className="rounded-0" onClick={() => setmodalOpen(true)}>
          New{" "}
          {conversationsOpen
            ? `${CONVERSATIONS_KEY.slice(0, -1)}`
            : `${CONTACTS_KEY.slice(0, -1)}`}
        </Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
export default Sidebar;
