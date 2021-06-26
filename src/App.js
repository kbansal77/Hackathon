import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from "./components/login/LogIn";
import "./App.css";
import CreateMail from "./pages/createMail/createMail";
import editMail from "./pages/editMail/editMail";

import Landing from "./pages/landingPage/Landing";
import Dashboard from "./pages/dashboard/dashboard";




function App() {
  
  return (
    <AuthProvider>
      <Router>
          <Switch>
            <Route exact path="/" component={Landing} />            
            <Route path="/createMail" component={CreateMail}/>
            <Route path="/dashboard" component= {Dashboard} />
            <Route path="/editMail" component= {editMail} />
          </Switch>
        </Router>     
        
    </AuthProvider>
  );
}


export default App;
