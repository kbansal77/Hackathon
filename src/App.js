import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from "./components/LogIn";


function App() {
  return (
    <AuthProvider>
      <Router>
          <Switch>
            <Route exact path="/" />
            <Route path="/login" component={LogIn} />
            
          </Switch>
        </Router>
      <div className="App">
      <h1> hello</h1>
    </div>
    </AuthProvider>
    
  );
}

export default App;
