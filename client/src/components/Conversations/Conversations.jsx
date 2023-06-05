import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../contexts/ConversationsProvider";

function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();
  //   console.log(conversations);
  return (
    <ListGroup variant="flush">
      {conversations.map((item, index) => (
        <ListGroup.Item
          key={index}
          action
          active={item.selected}
          onClick={() => selectConversationIndex(index)}
        >
          {item.recipients.map((r) => r.name).join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
export default Conversations;
