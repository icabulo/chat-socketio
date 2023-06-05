/* eslint-disable react/prop-types */
import { Sidebar } from "../Sidebar";
import { OpenConversation } from "../OpenConversation";
import { useConversations } from "../../contexts/ConversationsProvider";

function Dashboard({ id }) {
  const { selectedConversation } = useConversations();

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
}
export default Dashboard;

/* import { Sidebar } from "../Sidebar";
import {
  initialContext,
  ContactsContext,
} from "../../contexts/contactsContext";

function Dashboard({ id }) {
  return (
    <ContactsContext.Provider value={initialContext}>
      <div className="d-flex" style={{ height: "100vh" }}>
        <Sidebar id={id} />
      </div>
    </ContactsContext.Provider>
  );
}
export default Dashboard; */
