import "./App.css";
import { ChatLogin } from "./components/ChatLogin";
import useLocalStorage from "./hooks/useLocalStorage";
import { Dashboard } from "./components/Dashboard";
import { ContactsProvider } from "./contexts/ContactsProvider";
import { ConversationsProvider } from "./contexts/ConversationsProvider";

function App() {
  const [id, setId] = useLocalStorage("id");
  // console.log(id);

  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  );

  return <>{id ? dashboard : <ChatLogin onIdSubmit={setId} />}</>;
}

export default App;
