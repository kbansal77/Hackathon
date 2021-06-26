import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from "./components/login/LogIn";
import "./App.css";
import CreateMail from "./pages/createMail/createMail";
import home from "./pages/homePage/home";
import Landing from "./pages/landingPage/Landing";



function App() {
  
  return (
    <AuthProvider>
      <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={LogIn} />
            <Route path="/createMail" component={CreateMail}/>
            <Route path="/home" component={home}/>
            
          </Switch>
        </Router>     
    </AuthProvider>
    
  );
}


export default App;
