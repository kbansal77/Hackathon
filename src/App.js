import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from "./components/login/LogIn";
import "./App.css";
import CreateMail from "./pages/createMail/createMail";

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
          </Switch>
        </Router>     
        
    </AuthProvider>
  );
}


export default App;
