// eslint-disable-next-line no-unused-vars
import { useState, useRef, useCallback } from "react";
import { Button, Form, InputGroup, Badge } from "react-bootstrap";
import { useConversations } from "../../contexts/ConversationsProvider";

function OpenConversation() {
  const [text, setText] = useState("");
  const dummyScrollToBottom = useRef();
  /* const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []); */

  const { sendMessage, selectedConversation } = useConversations();
  //   console.log("Conversacion", selectedConversation);
  function handleSubmit(e) {
    e.preventDefault();
    // console.log("sended message");
    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
    dummyScrollToBottom.current.scrollIntoView({ smooth: true });
    // dummyScrollToBottom.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div
      className="d-flex flex-column flex-grow-1"
      //   style={{ border: "1px solid blue" }}
    >
      <div className="text-center">
        <Badge bg="light" text="dark">
          {selectedConversation.recipients.map((r) => r.name).join(" / ")}
        </Badge>
      </div>
      <div
        className="flex-grow-1 overflow-auto d-flex flex-column-reverse"
        // style={{ border: "1px solid red" }}
      >
        <div
          className="d-flex flex-column px-3 align-items-start justify-content-end "
          //   style={{ border: "1px solid green" }}
        >
          {selectedConversation.messages.map((message, index) => {
            /* const lastMessage =
              selectedConversation.messages.length - 1 === index; */
            return (
              <div
                // ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.fromMe
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small `}
                  style={
                    message.fromMe
                      ? { textAlign: "right" }
                      : { textAlign: "left" }
                  }
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
          <span ref={dummyScrollToBottom}></span>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            ></Form.Control>
            <Button type="submit">Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
export default OpenConversation;
