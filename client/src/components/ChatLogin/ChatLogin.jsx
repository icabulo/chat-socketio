/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { nanoid } from "nanoid";

function ChatLogin({ onIdSubmit }) {
  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  };

  const createNewId = () => {
    onIdSubmit(nanoid());
  };

  return (
    <Container
      fluid
      style={{ height: "100vh" }}
      className="d-flex align-items-center"
    >
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter Your ID</Form.Label>
          <Form.Control type="text" ref={idRef} required></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          onClick={() => console.log("Login")}
          className="m-2"
        >
          Login
        </Button>
        <Button variant="secondary" onClick={createNewId} className="create-id">
          Create new User
        </Button>
      </Form>
    </Container>
  );
}
export default ChatLogin;
