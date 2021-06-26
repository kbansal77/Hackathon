import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import "./App.css";
import CreateMail from "./pages/createMail/createMail";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" />
          <Route path="/login" component={LogIn} />
          <Route path="/CreateMail" component={CreateMail} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}


export default App;
