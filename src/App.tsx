import { start } from "repl";
import "./App.css";
import Header from "./components/utils/Header";
import ScrollableTabs from "./components/utils/ScrollableTabs";
import { UserProvider } from "./components/utils/UserContext";

function App() {
  return (
    <UserProvider>
      <Header />
      <ScrollableTabs />
    </UserProvider>
  );
}

export default App;