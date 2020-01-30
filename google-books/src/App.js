import React from "react";
import Books from "./pages/BookSearch";
import Nav from "./components/Nav";
import Saved from "./pages/SavedBooks"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <Nav/>
          <Switch>
              <Route exact path="/" component={Books} />
              <Route exact path="/saved" component={Saved} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
